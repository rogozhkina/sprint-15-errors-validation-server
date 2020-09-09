module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'no-underscore-dangle': 'off',
    'no-var': 'error',
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'prefer-const': 'error',
    'no-use-before-define': 'error',
    'object-curly-newline': 'off',
    'comma-dangle': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    eqeqeq: 'off',
    'consistent-return': 'off',
  }
};
