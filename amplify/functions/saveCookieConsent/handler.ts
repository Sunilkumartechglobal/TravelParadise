import type {
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { google } from "googleapis";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const GOOGLE_CREDENTIALS_JSON =
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

async function getSheetsClient() {
  if (!GOOGLE_CREDENTIALS_JSON) {
    throw new Error("Missing GOOGLE_APPLICATION_CREDENTIALS_JSON");
  }

  const credentials = JSON.parse(GOOGLE_CREDENTIALS_JSON);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();

  return google.sheets({
    version: "v4",
    auth: client as any,
  });
}

export const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    if (!SPREADSHEET_ID) {
      throw new Error("Missing SPREADSHEET_ID");
    }

    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Request body is required" }),
      };
    }

    const data = JSON.parse(event.body);

    const {
      name,
      phone,
      timestamp,
      consentType,
      source,
      userAgent,
    } = data as {
      name?: string;
      phone?: string;
      timestamp?: string;
      consentType?: string;
      source?: string;
      userAgent?: string;
    };

    if (!name || !phone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Name and phone are required",
        }),
      };
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Invalid phone number format",
        }),
      };
    }

    const sheets = await getSheetsClient();

    const userId = `USER_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 11)}`;

    const clientIp =
      event.headers["x-forwarded-for"] ||
      event.requestContext?.identity?.sourceIp ||
      "unknown";

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "CookieConsents!A:H",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            userId,
            name,
            phone,
            timestamp || new Date().toISOString(),
            consentType || "unknown",
            source || "unknown",
            clientIp,
            userAgent || "unknown",
          ],
        ],
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Cookie consent saved successfully",
        userId,
      }),
    };
  } catch (error) {
    const err = error as Error;

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to save cookie consent",
        details: err.message,
      }),
    };
  }
};