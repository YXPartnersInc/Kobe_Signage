import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel/serverless';
import dotenv from "dotenv";

dotenv.config();

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind({
    applyBaseStyles: false,
  }), react()],

  adapter: vercel(),
})