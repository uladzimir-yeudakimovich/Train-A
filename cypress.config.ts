import { defineConfig } from 'cypress';
import webpack from '@cypress/webpack-preprocessor';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: require('./webpack.config.ts'),
        watchOptions: {},
      };

      on('file:preprocessor', webpack(options));
    },
    baseUrl: 'http://localhost:4200/Train-A/#/',
  },
});
