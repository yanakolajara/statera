const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',

    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',

    setupNodeEvents(on, config) {
      // e.g., implement node event listeners for custom tasks,
      // or any plugin file reference:
      // return require('./cypress/plugins/index.js')(on, config);
    },
  },
});
