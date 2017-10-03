const rt_variables = {
  '--button-neutral-color-contrast': '#fff',
};
module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname,
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-cssnext': {
      features: {
        customProperties: {
          variables: rt_variables,
        },
      },
    },
  },
};