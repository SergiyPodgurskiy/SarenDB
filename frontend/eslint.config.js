import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1) Загальні JS/TS правила
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2023,
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } }
    }
  },

  // 2) TypeScript плагін
  tseslint.configs.recommended,

  // 3) React плагін та наші додаткові налаштування
  {
    plugins: { react: pluginReact },
    extends: [pluginReact.configs.flat.recommended],
    settings: {
      react: { version: "detect" }    // автоматично підхопити вашу версію React
    },
    rules: {
      "react/react-in-jsx-scope": "off",       // імпорт React для JSX не потрібен
      "react/jsx-no-target-blank": [
        "warn",
        { allowReferrer: false }
      ]
    }
  },

  // 4) JSON/JSONC
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"]
  },
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"]
  },

  // 5) Markdown (GFM)
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"]
  },

  // 6) CSS
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"]
  }
]);
