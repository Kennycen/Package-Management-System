import { defineConfig } from "vite";

export default defineConfig({
    test: {
        environment: "jsdom",
        globals: true,
        include: ['src/**/*.{test,spec}.{js,jsx}'],
    },
});