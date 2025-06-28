import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadFile } from '@/app/api/client/uploadFileApi';
import { TypographyH4, TypographySmall } from "@/components/ui/Typography";
import { UploadcareDirectUploadResponse } from '@/types/uploadcare';
import { Loader2, UploadCloud } from "lucide-react";
import { ImageDisplayCard } from "@/components/ui/image-display-card";
import { getUploadcareUrl } from "@/lib/uploadcareUrl";

const MAX_FILES = 5;
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<UploadcareDirectUploadResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = Array.from(e.target.files || []);
    if (files.length > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} files.`);
      return;
    }
    for (const file of files) {
      if (file.size > MAX_SIZE_BYTES) {
        setError(`Each file must be less than ${MAX_SIZE_MB} MB.`);
        return;
      }
    }
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    setError(null);
    setUploading(true);
    setUploadResults([]);
    try {
      const results: UploadcareDirectUploadResponse[] = [];
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        // Add more Uploadcare params here if needed
        const res = await uploadFile(formData);
        results.push(res);
      }
      setUploadResults(results);
      setSelectedFiles([]);
      if (inputRef.current) inputRef.current.value = '';
    } catch (err: any) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <TypographyH4>Upload files</TypographyH4>
      <Input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        disabled={uploading}
        aria-label="Upload files"
      />
      {selectedFiles.length > 0 && (
        <ul className="text-sm text-muted-foreground">
          {selectedFiles.map((file, i) => (
            <li key={i}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
          ))}
        </ul>
      )}
      {error && <TypographySmall className="text-red-500">{error}</TypographySmall>}
      <Button
        onClick={handleUpload}
        disabled={uploading || selectedFiles.length === 0}
        className="flex items-center gap-2"
      >
        {uploading ? <Loader2 className="animate-spin w-4 h-4" /> : <UploadCloud className="w-4 h-4" />}
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
      {uploadResults.length > 0 && (
        <div className="space-y-2">
          <TypographySmall>Upload results:</TypographySmall>
          <ul className="text-sm">
            {uploadResults.map((res, i) => (
              <li key={i} className="break-all">{res.file}</li>
            ))}
          </ul>
          <div className="flex flex-row gap-2 mt-2">
            {uploadResults.map((res, i) => (
              <ImageDisplayCard key={i} url={getUploadcareUrl(res.file)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
