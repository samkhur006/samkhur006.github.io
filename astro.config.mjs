import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import tailwindConfig from './tailwind.config.cjs'; // Adjust the path accordingly

// https://astro.build/config
export default defineConfig({
  site: 'https://samkhur006.github.io',
  integrations: [mdx(), tailwind({ config: tailwindConfig })],
  server: {
    host: true
  }
});
