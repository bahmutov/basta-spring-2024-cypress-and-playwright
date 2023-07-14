import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import * as fs from 'fs/promises';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    experimentalWebKitSupport: true,
    setupNodeEvents(on, config) {
      on('task', {
        async log(message: string) {
          await fs.writeFile('cypress.log', message);
          return message;
        },
      });
    },
  },
});
