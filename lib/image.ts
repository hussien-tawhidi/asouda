import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
/**
 * Saves a single uploaded file to the public directory
 * @param file - The file object from FormData (File)
 * @param folder - Subfolder inside public (default: "uploads")
 * @returns Public URL path (e.g., "/uploads/uuid.jpg")
 */
export async function saveUploadedFile(
  file: File,
  folder: string = "uploads",
): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), "public", folder);
  await mkdir(uploadDir, { recursive: true });

  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${uuidv4()}.${ext}`;
  const fullPath = join(uploadDir, fileName);

  await writeFile(fullPath, buffer);

  return `/${folder}/${fileName}`;
}

/**
 * Saves multiple uploaded files (or a single one) to the public directory
 * @param files - A File, File[] or FormData entry (can be a single File or array)
 * @param folder - Subfolder inside public (default: "uploads")
 * @returns Array of public URL paths
 */
export async function saveUploadedFiles(
  files: globalThis.File|File[] ,
  folder: string = "uploads",
): Promise<string[]> {
  // Normalise to an array
  let fileArray: File[] = [];

  if (Array.isArray(files)) {
    // If it's an array of FormDataEntryValue, filter out non-Files
    fileArray = files.filter((f): f is File => f instanceof File);
  } else if (files instanceof File) {
    fileArray = [files];
  } else {
    // It might be a single FormDataEntryValue (string or File)
    if (files) {
      fileArray = [files];
    } else {
      // If it's a string or other, ignore
      return [];
    }
  }

  // Save each file and collect URLs
  const urls = await Promise.all(
    fileArray.map((file) => saveUploadedFile(file, folder)),
  );

  return urls;
}

export const deleteImage = async (
  productId: string,
  imageIdToDelete: string,
) => {
  const response = await fetch("/api/admin/products/delete-image", {
    method: "DELETE",
    body: JSON.stringify({ productId, imageIdToDelete }),
    headers: { "Content-Type": "application/json" },
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Failed to delete image");
  return result;
};
