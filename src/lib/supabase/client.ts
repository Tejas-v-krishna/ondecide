import { createBrowserClient } from "@supabase/ssr";

// Browser/client-side Supabase client using @supabase/ssr
export function getSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
