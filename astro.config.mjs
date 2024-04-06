import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  site: 'https://www.alanai.app/',
  integrations: [icon()]
});
