import alpinejs from "@astrojs/alpinejs";
import cloudflare from "@astrojs/cloudflare";
import markdoc from "@astrojs/markdoc";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import keystatic from "@keystatic/astro";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import { siteTitle, siteUrl } from "./site.config";

// https://astro.build/config
export default defineConfig({
	site: siteUrl,
	output: "static",
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
			configPath: "wrangler.jsonc",
			experimentalJsonConfig: true,
		},
	}),
	compressHTML: true,
	redirects: {
		"/admin": "/keystatic",
	},
	vite: {
		define: {
			__DATE__: `'${new Date().toISOString()}'`,
		},
	},
	integrations: [
		alpinejs(),
		tailwind({
			applyBaseStyles: false,
		}),
		sitemap(),
		icon(),
		react(),
		markdoc(),
		keystatic(),
		robotsTxt({
			policy: [{ userAgent: "*", allow: "/" }],
		}),
	],
});
