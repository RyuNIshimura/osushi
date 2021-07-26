module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8
  },
  plugins: [
    'react'
  ],
  ignorePatterns: [
    'node_modules/*',
    'docs/*',
    'styles/*',
    'public/*',
    '.next/*',
    'out/*',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  rules: {
    'semi': ['error', 'never'],
    'eqeqeq': 2,
    'quotes': [2, 'single', 'avoid-escape'],
    'indent': ['error', 2],
    'no-undef': 'off',
    'no-unused-vars': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'prefer-const': 'error',
    'no-var': 'error'
  }
}