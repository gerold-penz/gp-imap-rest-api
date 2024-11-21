import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'


export default defineConfig({
    plugins: [sveltekit()],
    define: {
        // Hier werden Variablen von der package.json an die Anwendung übergeben.
        "PACKAGE": {
            "name": process.env.npm_package_name,
            "version": process.env.npm_package_version,
        },
    },
    optimizeDeps: {
        exclude: ["imapflow"]
    }
})
