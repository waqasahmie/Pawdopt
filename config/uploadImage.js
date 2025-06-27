import * as FileSystem from "expo-file-system";
import { supabase } from "../config/supabase";
import { decode } from "base64-arraybuffer";

export async function uploadImage(bucketName, filePathInBucket, fileUri) {
  try {
    if (!fileUri) {
      console.error("❌ Invalid file URI provided");
      return undefined;
    }

    const base64String = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePathInBucket, decode(base64String), {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error("❌ Upload error:", uploadError.message);
      return undefined;
    }

    const { data: publicUrlData, error: urlError } = supabase
      .storage
      .from(bucketName)
      .getPublicUrl(filePathInBucket);

    if (urlError) {
      console.error("❌ Error fetching public URL:", urlError.message);
      return undefined;
    }

    console.log("✅ Uploaded successfully! URL:", publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("❌ Unexpected error during upload:", err.message);
    return undefined;
  }
}
