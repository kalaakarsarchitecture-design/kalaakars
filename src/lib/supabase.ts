import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy-initialized browser/server public client.
// Prevents build-time crash when NEXT_PUBLIC_ vars are not injected yet.
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
    if (_client) return _client;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        throw new Error(
            "Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY"
        );
    }

    _client = createClient(url, key);
    return _client;
}

// Legacy named export for backwards-compat with existing `import { supabase }` usage.
export const supabase = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        return (getSupabase() as any)[prop];
    },
});
