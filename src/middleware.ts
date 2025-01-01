import { defineMiddleware } from "astro/middleware";
import { rewrite } from "@vercel/edge";

export const  onRequest = defineMiddleware((context, next) => {
  const { request } = context;
  const url = new URL(request.url);

  if (url.pathname.startsWith("/analytics.js")) {
    return rewrite(new URL("/analytics.js", 'https://analytics.ahrefs.com'));
  }

  return next();
});
