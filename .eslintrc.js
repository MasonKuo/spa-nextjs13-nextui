module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    // 'eslint:recommended',
    'next',
    // Uncomment the following lines to enable eslint-config-prettier
    // Is not enabled right now to avoid issues with the Next.js repo
    'prettier',
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    // 'react/prop-types': 0,
    'prettier/prettier': 'warn',
    'react-hooks/exhaustive-deps': 0,
    'no-useless-escape': [0],
    'no-undef': [0],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: 'Taro',
      },
    ],
    // 'no-console': [
    //   2,
    //   {
    //     allow: ['warn', 'error'],
    //   },
    // ],
  },
};
