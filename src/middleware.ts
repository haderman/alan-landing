import { defineMiddleware } from "astro/middleware";
import { rewrite } from "@vercel/edge";

export const  onRequest = defineMiddleware((context, next) => {
  const { request } = context;
  const url = new URL(request.url);

  if (url.pathname.startsWith("/api/analytics.js")) {
    const newUrl = new URL("/analytics.js", "https://analytics.ahrefs.com");
    console.log("newUrl: ", newUrl);
    return rewrite(newUrl, {
      headers: {
        "content-type": "application/javascript",
      },
    });
  }

  return next();
});
