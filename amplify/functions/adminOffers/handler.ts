import type { APIGatewayProxyHandler } from 'aws-lambda';
import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

console.log({
  SPREADSHEET_ID,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  GOOGLE_APPLICATION_CREDENTIALS_JSON: process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
})

async function getSheetsClient() {
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}');
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client as any });
}

function verifyAdmin(authHeader: string | undefined): boolean {
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  return token === ADMIN_PASSWORD;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (!verifyAdmin(event.headers.authorization || event.headers.Authorization)) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  try {
    const sheets = await getSheetsClient();
    const range = 'offers2';

    // GET - Fetch all offers
    if (event.httpMethod === 'GET') {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range,
      });
      const rows = response.data.values || [];
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ rows }),
      };
    }

    // POST - Add new offer
    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body || '{}');
      const { description, email, id, image, location, map, price, rating, reviews, title, whatsapp } = data;

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'offers2!A:K',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            description || '',
            email || '',
            id || '',
            image || '',
            location || '',
            map || '',
            price || '',
            rating || '',
            reviews || '',
            title || '',
            whatsapp || '',
          ]],
        },
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Offer added' }),
      };
    }

    // PUT - Update existing offer
    if (event.httpMethod === 'PUT') {
      const data = JSON.parse(event.body || '{}');
      const { rowIndex, description, email, id, image, location, map, price, rating, reviews, title, whatsapp } = data;

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `offers2!A${rowIndex}:K${rowIndex}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            description || '',
            email || '',
            id || '',
            image || '',
            location || '',
            map || '',
            price || '',
            rating || '',
            reviews || '',
            title || '',
            whatsapp || '',
          ]],
        },
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Offer updated' }),
      };
    }

    // DELETE - Remove offer
    if (event.httpMethod === 'DELETE') {
      const { rowIndex } = JSON.parse(event.body || '{}');

      // Get sheet metadata to find sheetId
      const sheetMetadata = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      });

      const sheet = sheetMetadata.data.sheets?.find(s => s.properties?.title === 'offers2');
      const sheetId = sheet?.properties?.sheetId || 0;

      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [{
            deleteDimension: {
              range: {
                sheetId: sheetId,
                dimension: 'ROWS',
                startIndex: rowIndex - 1,
                endIndex: rowIndex,
              },
            },
          }],
        },
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Offer deleted' }),
      };
    }

    return { statusCode: 405, headers, body: 'Method Not Allowed' };

  } catch (err) {
    console.error('Admin API error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: (err as Error).message, details: String(err) }),
    };
  }
};
