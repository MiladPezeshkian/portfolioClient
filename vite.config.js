import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  // server: {
  //   host: "0.0.0.0", // برای دسترسی از همه آدرس‌ها
  //   port: 3000, // پورت دلخواه، که می‌تواند با پورت پیش‌فرض Render همخوانی داشته باشد
  // },
});
