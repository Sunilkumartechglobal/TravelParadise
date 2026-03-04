import type { APIGatewayProxyHandler } from 'aws-lambda';
import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function getSheetsClient() {
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}');
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const client = await auth.getClient();
  // 'as any' is used to satisfy strict TypeScript definitions for the Google client
  return google.sheets({ version: 'v4', auth: client as any });
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { name, phone, timestamp, consentType, source, userAgent } = data;

    if (!name || !phone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name and phone are required' }),
      };
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid phone number format' }),
      };
    }

    const sheets = await getSheetsClient();
    const userId = `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Safely retrieve the client IP from the event context
    const clientIp = event.requestContext?.identity?.sourceIp || 
                     (event.headers['X-Forwarded-For'] as string)?.split(',')[0] || 
                     'unknown';

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'CookieConsents!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          userId,
          name,
          phone,
          timestamp,
          consentType,
          source,
          clientIp,
          userAgent || 'unknown',
        ]],
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Cookie consent saved successfully',
        userId: userId,
      }),
    };

  } catch (error) {
    console.error('Error saving cookie consent:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to save cookie consent',
        details: (error as Error).message,
      }),
    };
  }
};