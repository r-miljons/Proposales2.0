"use client";

import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { uploadFile } from '@/app/api/client/uploadFileApi';


const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const DEFAULT_MAX_FILES = 5;

interface FileUploadProps {
  onUploadComplete: (uuids: string[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxFiles?: number;
}

import { TypographySmall } from "@/components/ui/Typography";

export function FileUpload({ onUploadComplete, accept = 'image/*', multiple = true, disabled = false, maxFiles }: FileUploadProps) {
  const [uploading, setUploading] = React.useState(false);
  const [uploadCount, setUploadCount] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const effectiveMaxFiles = typeof maxFiles === 'number' ? maxFiles : DEFAULT_MAX_FILES;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setError(null);
    if (!files.length) return;
    if (files.length > effectiveMaxFiles) {
      setError(`You can only upload up to ${effectiveMaxFiles} file${effectiveMaxFiles !== 1 ? 's' : ''}.`);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    setUploading(true);
    setUploadCount(files.length);
    try {
      const uuids: string[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await uploadFile(formData); // must return { file: uuid }
        uuids.push(res.file);
      }
      if (inputRef.current) inputRef.current.value = '';
      onUploadComplete(uuids);
    } catch (err) {
      // Optionally handle error (e.g., toast)
    } finally {
      setUploading(false);
      setUploadCount(0);
    }
  };

  return (
    <>
      {uploading ? (
        <Button variant="secondary" disabled className="w-full flex items-center gap-2" aria-busy>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Uploading {uploadCount} file{uploadCount !== 1 ? 's' : ''}...
        </Button>
      ) : (
        <Input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleFileChange}
          aria-label="Upload files"
        />
      )}
      {error && (
        <TypographySmall className="text-destructive mt-2">
          {error}
        </TypographySmall>
      )}
    </>
  );
}
