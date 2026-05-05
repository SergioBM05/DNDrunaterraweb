import { createClient } from '@supabase/supabase-js';
//sddad

// Llamar directamente a import.meta.env dentro de createClient
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);