module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['node'],
  extends: ['airbnb-base', 'prettier', 'plugin:node/recommended'],
  rules: {
    'linebreak-style': 0,
    'no-param-reassign': [2, { props: false }],
    'node/no-unsupported-features': 0,
    'no-underscore-dangle': 0,
  },
};
