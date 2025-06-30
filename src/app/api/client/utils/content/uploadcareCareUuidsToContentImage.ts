import type { ContentImage } from '@/types/content';
import { getFileInfo } from '@/app/api/client/uploadFileApi';
import { getUploadcareUrl } from '@/lib/uploadcareUrl';

/**
 * Converts an array of Uploadcare image UUIDs to ContentImage objects by fetching file info for each.
 * @param uuids - Array of Uploadcare image UUID strings
 * @returns Promise resolving to an array of ContentImage objects
 */
export async function uploadcareCareUuidsToContentImage(uuids: string[]): Promise<ContentImage[]> {
  const results = await Promise.all(
    uuids.map(async (uuid) => {
      const info = await getFileInfo(uuid);
      // Map UploadcareFileInfo to ContentImage
      const image: ContentImage = {
        uuid: info.uuid,
        filename: info.filename || undefined,
        mime_type: info.mime_type,
        size: typeof info.size === 'number' ? info.size : undefined,
        height: info.image_info && typeof info.image_info.height === 'number' ? info.image_info.height : undefined,
        width: info.image_info && typeof info.image_info.width === 'number' ? info.image_info.width : undefined,
        url: getUploadcareUrl(info.uuid),
      };
      return image;
    })
  );
  return results;
}
