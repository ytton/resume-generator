module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react', 'prettier', '@typescript-eslint/eslint-plugin', 'jsx-a11y'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
  }
}
