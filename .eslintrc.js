// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  extends: ['airbnb-typescript', 'plugin:jest/recommended', 'prettier'],
  parserOptions: {
    project: './tsconfig.json'
    // ecmaVersion: 6,
    // sourceType: 'module',
    // ecmaFeatures: {
    //   jsx: true
    // }
  }
}
