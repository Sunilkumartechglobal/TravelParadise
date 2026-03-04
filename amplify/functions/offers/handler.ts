import type { APIGatewayProxyHandler } from 'aws-lambda';
import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function getSheetsClient() {
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}');

  const auth = new google.auth.GoogleAuth({
    credentials,
    // Use read-only scope for safety since this is a public fetch function
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const client = await auth.getClient();
  // Using 'as any' here ensures compatibility with the latest googleapis types
  return google.sheets({ version: 'v4', auth: client as any });
}

function rowsToObjects(rows: string[][]) {
  if (!rows || rows.length === 0) return [];
  const headers = rows[0];
  const dataRows = rows.slice(1);
  return dataRows.map(r => {
    const obj: Record<string, string | number> = {};
    headers.forEach((h, i) => {
      obj[h] = r[i] !== undefined ? r[i] : '';
    });
    if (obj.price !== undefined && obj.price !== '') {
      const n = Number(obj.price);
      obj.price = isNaN(n) ? obj.price : n;
    }
    if (obj.id !== undefined && obj.id !== '') {
      const n = Number(obj.id);
      obj.id = isNaN(n) ? obj.id : n;
    }
    return obj;
  });
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const sheets = await getSheetsClient();
    const range = 'offers'; 
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
    console.error('Error reading offers sheet:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error reading offers sheet', details: String(err) }),
    };
  }
};