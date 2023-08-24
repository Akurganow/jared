module.exports = {
  plugins: [
    require('postcss-easings'),
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    }),
    require('cssnano')({
      preset: ['default', { discardComments: { removeAll: true } }],
    }),
  ],
};
