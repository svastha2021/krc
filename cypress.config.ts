import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:'http://localhost:4200',
    env:{
      USERNAME:"krc0010001",
      PASSWORD:"krc0010001"
    }
  },
});
