const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './src/app/shared/'),
    },
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'cypress/tsconfig.json',
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};
