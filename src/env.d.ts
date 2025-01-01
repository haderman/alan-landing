/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
  readonly BREVO_API_KEY: string;
  readonly AXIOM_TOKEN: string;
  readonly AHREFS_ANALYTICS_LEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
