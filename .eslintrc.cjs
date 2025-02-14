module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true, // اضافه کردن node برای شناسایی متغیرهای node مانند process
  },
  globals: {
    process: true, // اضافه کردن process به عنوان global
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "react-app", // اگر از Create React App استفاده می‌کنید
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
