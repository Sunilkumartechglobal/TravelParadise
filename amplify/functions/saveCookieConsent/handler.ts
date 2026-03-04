const { google } = require('googleapis');

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function getSheetsClient() {
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client });
}

exports.handler = async function (event, context) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, phone, timestamp, consentType, source, userAgent } = data;

    // Validate required fields
    if (!name || !phone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name and phone are required' })
      };
    }

    // Validate phone number format
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid phone number format' })
      };
    }

    const sheets = await getSheetsClient();

    // Generate unique user ID
    const userId = `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Get client IP (Netlify provides this)
    const clientIp = event.headers['x-forwarded-for'] || 
                     event.requestContext?.identity?.sourceIp || 
                     'unknown';

    // Append to Google Sheet (create "CookieConsents" tab with headers)
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'CookieConsents!A:H',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[
          userId,
          name,
          phone,
          timestamp,
          consentType,
          source,
          clientIp,
          userAgent || 'unknown'
        ]]
      }
    });

    console.log(`Cookie consent saved: ${name} - ${phone}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Cookie consent saved successfully',
        userId: userId
      })
    };

  } catch (error) {
    console.error('Error saving cookie consent:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to save cookie consent',
        details: error.message
      })
    };
  }
};
