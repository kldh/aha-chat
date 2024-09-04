# AI Chat Wrapper with React, TypeScript, and Vite

This project uses Cursor AI to build an AI Chat wrapper, combining modern technologies like React, TypeScript, Vercel AI SDK, Vite, shadcn UI, TailwindCss

## Technologies Used

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn UI](https://ui.shadcn.com/) for UI components
- [Vercel AI SDK](https://vercel.com/blog/introducing-the-vercel-ai-sdk) for AI integration

## Features

- AI Chat wrapper built with Cursor AI
- Modern and responsive user interface
- Seamless integration with AI models through Vercel AI SDK

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the app in development mode: `npm run dev`

## Contributing

We welcome contributions to this project. Please read `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
