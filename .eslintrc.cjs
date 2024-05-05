const path = require('path');

module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    // Chúng ta sẽ dùng các rule mặc định từ các plugin mà chúng ta đã cài.
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    // Disable các rule mà eslint xung đột với prettier.
    // Để cái này ở dưới để nó override các rule phía trên!.
    'eslint-config-prettier',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  settings: {
    // Nói eslint-plugin-react tự động biết version của React.
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname)],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      alias: {
        map: [
          ['', './public'],
          ['@', path.resolve(__dirname, 'src')]
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // Tắt rule yêu cầu import React trong file jsx
    'react/react-in-jsx-scope': 'off',
    // Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
    'react/jsx-no-target-blank': 'warn',
    // Tăng cường một số rule prettier (copy từ file .prettierrc qua)
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: true,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  }
};
