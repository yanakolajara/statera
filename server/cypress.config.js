const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001', // Replace with your server URL
    setupNodeEvents(on, config) {},
  },
});
