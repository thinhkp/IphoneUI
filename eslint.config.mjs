import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react/no-unescaped-entities": "off", // Bỏ lỗi về dấu nháy đơn (')
      "react/react-in-jsx-scope": "off", // Không cần import React trong Next.js
      "no-console": "warn", // Cảnh báo khi dùng console.log
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Bỏ qua biến bắt đầu bằng _
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/exhaustive-deps": "off", // Tắt rule này
      "prefer-const": "off", //tắt prefer khai báo const
      "@typescript-eslint/no-unused-expressions": "off", // Tắt lỗi biểu thức 3 ngôi không được sử dụng
    },
  },
];

export default eslintConfig;
