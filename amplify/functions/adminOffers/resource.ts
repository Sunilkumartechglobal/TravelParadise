import { defineFunction } from '@aws-amplify/backend';

export const adminOffers = defineFunction({
  name: 'adminOffers',
  entry: './handler.ts',
  environment: {
    SPREADSHEET_ID: process.env.SPREADSHEET_ID!,
    GOOGLE_APPLICATION_CREDENTIALS_JSON: process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON!,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
  },
  timeoutSeconds: 30,
});
