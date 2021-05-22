import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    proxy: {
        "/api": {
            target: "http://arch.wsl:9090",
            changeOrigin: true,
            secure: false,
        }
    }
});
