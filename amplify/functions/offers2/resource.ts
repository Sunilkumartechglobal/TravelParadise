import { defineFunction } from '@aws-amplify/backend';

export const offers2 = defineFunction({
  name: 'offers2',
  entry: './handler.ts',
  environment: {
    SPREADSHEET_ID: process.env.SPREADSHEET_ID!,
    GOOGLE_APPLICATION_CREDENTIALS_JSON: process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON!,
  },
  timeoutSeconds: 30,
});
