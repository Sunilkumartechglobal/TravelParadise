import { defineFunction } from '@aws-amplify/backend';

export const saveCookieConsent = defineFunction({
  name: 'saveCookieConsent',
  entry: './handler.ts',
  environment: {
    SPREADSHEET_ID: process.env.SPREADSHEET_ID!,
    GOOGLE_APPLICATION_CREDENTIALS_JSON: process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON!,
  },
  timeoutSeconds: 30,
});
