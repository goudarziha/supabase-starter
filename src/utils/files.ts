import { supabase } from '../supabase';

export const createFileName = (file: any): string => {
  return '';
};

export const validateFiles = (value: FileList): boolean => {
  if (value.length < 1) {
    return false;
  }
  for (const file of Array.from(value)) {
    const fsMb = file.size / (1024 * 1024);
    const MAX_FILE_SIZE = 10;
    if (fsMb > MAX_FILE_SIZE) {
      return false;
    }
  }
  return true;
};

export const downloadSingleFile = async (
  bucket: string,
  path: string,
  setImageUrl: any
) => {
  try {
    const { data, error } = await supabase.storage.from(bucket).download(path);
    if (error) {
      throw error;
    }

    const url = URL.createObjectURL(data);
    setImageUrl(url);
  } catch (error) {
    console.log(error);
  }
};

export const uploadSingleFile = async (
  bucket: string,
  filePath: string,
  file: File
) => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.log(error);
  }
};
