import plugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import { fileURLToPath, URL } from 'node:url';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [plugin()],
	resolve: {
		alias: {
			// '@': fileURLToPath(new URL('./src', import.meta.url))
			'@': path.resolve(__dirname, '.src')
		}
	},
	base: "/Quizzler",
	server: {
		proxy: {
			"/Quizzler/api/": {
				//necessary to remove the prefix as the api does not need the 'quizzler' part of the url
				rewrite:(path) => path.replace("Quizzler", ""),
				target: "http://localhost:5123",
				changeOrigin: true,
				secure: false,
			},
		},
		port: 5173,
		origin: 'http://localhost:5173/Quizzler/'
	}
})
