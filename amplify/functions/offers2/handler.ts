import type { APIGatewayProxyHandler } from 'aws-lambda';
import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function getSheetsClient() {
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}');
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const client = await auth.getClient();
  // Using 'as any' prevents strict type conflicts during the AWS build
  return google.sheets({ version: 'v4', auth: client as any });
}

function rowsToObjects(rows: string[][]) {
  if (!rows || rows.length === 0) return [];
  const headers = rows[0];
  const dataRows = rows.slice(1);
  return dataRows.map(r => {
    const obj: Record<string, string | number> = {};
    headers.forEach((h, i) => {
      let value: string = r[i] !== undefined ? r[i] : '';

      // Clean image URLs - Remove markdown [text](url)
      if (h === 'image' && typeof value === 'string') {
        const urlMatch = value.match(/\[(.*?)\]\((.*?)\)/);
        if (urlMatch) {
          value = urlMatch[2];
        }
      }
      obj[h] = value;
    });

    // Consistent number conversions
    const numericFields = ['price', 'id', 'rating', 'reviews'];
    numericFields.forEach(field => {
      if (obj[field] !== undefined && obj[field] !== '') {
        const n = Number(obj[field]);
        obj[field] = isNaN(n) ? obj[field] : n;
      }
    });
    
    return obj;
  });
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'GET') return { statusCode: 405, headers, body: 'Method Not Allowed' };

  try {
    const sheets = await getSheetsClient();
    const range = 'offers2'; 
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });
    
    const rows = (response.data.values || []) as string[][];
    const offers = rowsToObjects(rows);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ offers }),
    };
  } catch (err) {
    console.error('Error reading offers2 sheet:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error reading offers2 sheet', details: String(err) }),
    };
  }
};