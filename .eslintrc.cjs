module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential', // Vue 3 相关的 ESLint 规则
    '@vue/eslint-config-prettier', // 确保 ESLint 不与 Prettier 冲突
    'plugin:prettier/recommended', // 使用 Prettier 作为 ESLint 规则
    '@vue/eslint-config-typescript' // 与 TypeScript 相关的 ESLint 规则
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'vue/multi-word-component-names': 0
  }
};
