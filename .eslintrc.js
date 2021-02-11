/**
 * @file ESLint Configuration
 * @see https://eslint.org/docs/user-guide/configuring
 */

const EXTENDS_CONFIG = [
  'eslint:recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:prettier/recommended',
  'prettier/@typescript-eslint'
]

module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: EXTENDS_CONFIG,
  globals: {},
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: false
    },
    sourceType: 'module'
  },
  plugins: [],
  rules: {
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-explicit-any': 0,
    eqeqeq: 1,
    'no-ex-assign': 0,
    'prefer-arrow-callback': 2,
    'prettier/prettier': [
      2,
      {
        usePrettierrc: true
      }
    ],
    'sort-keys': [
      1,
      'asc',
      {
        caseSensitive: true,
        minKeys: 2,
        natural: true
      }
    ],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'never',
        asyncArrow: 'always',
        named: 'never'
      }
    ]
  },
  overrides: [
    {
      files: ['**/__tests__/**'],
      env: {
        es6: true,
        'jest/globals': true,
        node: true
      },
      extends: EXTENDS_CONFIG.splice(1, 0, 'plugin:jest/recommended')
    },
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-var-requires': 0,
        'require-jsdoc': 1,
        'valid-jsdoc': 1
      }
    },
    {
      files: ['.eslintrc.js', '**/webpack.*'],
      rules: {
        'sort-keys': 0
      }
    }
  ],
  settings: {}
}
