import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			strategies: 'generateSW',
			srcDir: 'src',
			manifest: {
				"name": "IT Sairahut",
				"short_name": "IT Sairahut",
				"start_url": "/",
				"scope": "/",
				"icons": [
					{
						"src": "icons/icon-192.png",
						"sizes": "192x192",
						"type": "image/png"
					}
				],
				"theme_color": "#86198F",
				"background_color": "#86198F",
				"display": "standalone",
				"orientation": "portrait"
			}
			/* other pwa options */
		})
	]
});
