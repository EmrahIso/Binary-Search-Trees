import js from '@eslint/js';

import globals from 'globals';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  // any other config imports go at the top
  js.configs.recommended,
  eslintPluginPrettierRecommended,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  {
    files: ['src/**/*.js'],
    ignores: ['**/*.config.js', 'webpack.*.js'],
    rules: {
      semi: 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
    },
  },
];
