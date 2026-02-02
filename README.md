# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

my-app/
├── public/ # Các file tĩnh (favicon, robots.txt, logo không qua xử lý)
├── src/
│ ├── assets/ # Images, fonts, icons, global css
│ ├── components/ # Shared UI Components (Button, Input, Modal...) - Dùng chung toàn app
│ │ ├── ui/ # Các atomic component nhỏ (Button, Input)
│ │ └── form/ # Các form component phức tạp hơn
│ ├── config/ # Cấu hình môi trường (env), constants
│ ├── features/ # TRÁI TIM CỦA APP - Chia theo module nghiệp vụ
│ │ ├── auth/ # Ví dụ: Module xác thực
│ │ │ ├── api/ # API calls riêng cho Auth
│ │ │ ├── components/ # Component chỉ dùng trong Auth (LoginForm)
│ │ │ ├── hooks/ # Hooks riêng (useAuth)
│ │ │ ├── routes/ # Route con của Auth
│ │ │ ├── stores/ # State management riêng (nếu cần)
│ │ │ ├── types/ # Typescript types riêng
│ │ │ └── index.ts # Public API của feature này (export ra ngoài)
│ │ └── product/ # Module sản phẩm
│ ├── hooks/ # Global hooks (useTheme, useDebounce...)
│ ├── layouts/ # Các khung trang (MainLayout, AuthLayout)
│ ├── lib/ # Cấu hình thư viện bên thứ 3 (axios instance, react-query client)
│ ├── pages/ # Các trang chính (Page assembly) - Gom các feature lại
│ ├── routes/ # Cấu hình routing tổng (AppRoutes)
│ ├── stores/ # Global state (Redux Toolkit, Zustand)
│ ├── types/ # Global TypeScript types/interfaces
│ ├── utils/ # Các hàm tiện ích thuần (formatDate, formatCurrency)
│ ├── App.tsx # Root component
│ └── main.tsx # Entry point
├── .env # Biến môi trường
├── package.json
├── tsconfig.json # Cấu hình TypeScript
└── vite.config.ts # Cấu hình Vite
