import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import clarity from "@kbyte-tech/astro-clarity";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: {
      enabled: true,
    },
  }),
  site: "https://www.alanai.app/",
  integrations: [
    icon(),
    partytown(),
    clarity({
      enabled: true,
      projectId: "sd18gysdq6",
    }),
  ],
});