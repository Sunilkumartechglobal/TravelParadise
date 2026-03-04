import type { APIGatewayProxyHandler } from 'aws-lambda';
import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function getSheetsClient() {
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}');
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client as any });
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!authHeader || authHeader.replace('Bearer ', '') !== ADMIN_PASSWORD) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const sheets = await getSheetsClient();
    const range = 'offers2';

    if (event.httpMethod === 'GET') {
      const response = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range });
      return { statusCode: 200, headers, body: JSON.stringify({ rows: response.data.values || [] }) };
    }

    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body || '{}');
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'offers2!A:K',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[
          data.description || '', data.email || '', data.id || '', data.image || '', data.location || '',
          data.map || '', data.price || '', data.rating || '', data.reviews || '', data.title || '', data.whatsapp || ''
        ]] },
      });
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    if (event.httpMethod === 'DELETE') {
      const { rowIndex } = JSON.parse(event.body || '{}');
      const sheetMetadata = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
      const sheet = sheetMetadata.data.sheets?.find((s: any) => s.properties?.title === 'offers2');
      
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [{ deleteDimension: { range: {
            sheetId: sheet?.properties?.sheetId || 0,
            dimension: 'ROWS', startIndex: rowIndex - 1, endIndex: rowIndex
          }}}]
        },
      });
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: (err as Error).message }) };
  }
};