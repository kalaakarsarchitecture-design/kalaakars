import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Server-only admin client — never expose to browser.
// Lazy-initialized so it does NOT throw at module-load/build time
// when environment variables may not yet be present.
let _client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
    if (_client) return _client;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;

    if (!url || !key) {
        throw new Error(
            "Supabase admin env vars missing: NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_KEY"
        );
    }

    _client = createClient(url, key, {
        auth: { autoRefreshToken: false, persistSession: false },
    });

    return _client;
}

// Legacy named export — kept for backwards-compat so existing imports
// that reference `supabaseAdmin` directly still work at runtime.
// This is a getter-style proxy that calls getSupabaseAdmin() on access.
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        return (getSupabaseAdmin() as any)[prop];
    },
});
