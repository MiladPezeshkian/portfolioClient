import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// تابع برای بارگیری متغیرهای محیطی بر اساس `mode`
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), eslint()],
    define: {
      "process.env": JSON.stringify(env), // حل مشکل process.env
    },
    server: {
      host: true, // برای دسترسی از همه آدرس‌ها
      port: env.VITE_PORT || 3000, // استفاده از پورت محیطی یا مقدار پیش‌فرض
      open: true, // مرورگر هنگام اجرای پروژه باز شود
      strictPort: true, // اگر پورت اشغال بود، از پورت دیگری استفاده نکند
      cors: true, // فعال کردن CORS
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL, // تنظیم پراکسی برای درخواست‌ها
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: "dist", // دایرکتوری خروجی
      sourcemap: mode === "development", // فعال‌سازی sourcemap در حالت توسعه
      chunkSizeWarningLimit: 1000, // جلوگیری از هشدار مربوط به حجم فایل‌ها
    },
    resolve: {
      alias: {
        "@": "/src", // تعریف آدرس کوتاه برای دایرکتوری `src`
      },
    },
  };
});
