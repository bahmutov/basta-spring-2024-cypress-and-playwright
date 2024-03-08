import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
// @ts-expect-error
import * as fs from 'fs/promises';

export default defineConfig({
  projectId: '1im72c',
  e2e: {
    // @ts-expect-error
    ...nxE2EPreset(__dirname),
    experimentalWebKitSupport: true,
    baseUrl: 'http://localhost:4200',
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
