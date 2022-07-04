module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    'import',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
    'no-debugger': 'off',
    'no-console': 0,
    'class-methods-use-this': 'off'
  },
  ignorePatters: [
    '*.html',
    '*config.js',
    'tsconfig.json',
  ],
};
