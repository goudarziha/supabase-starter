import { supabase } from "../supabase";

class SupabaseService {
  //   async getAll() {
  //     const { data, error } = await supabase.select("");
  //   }
  async downloadImage(bucket: string, path: string, callback?: any) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path);
      if (error) throw error;
      if (data) {
        const url = URL.createObjectURL(data);
        return url;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
