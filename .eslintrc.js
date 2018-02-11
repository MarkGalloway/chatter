module.exports = {
  plugins: ['node', 'jest', 'security', 'prettier'],
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:security/recommended',
    'prettier',
  ],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
};
