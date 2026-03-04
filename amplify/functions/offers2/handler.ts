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
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const client = await auth.getClient();

  return google.sheets({
    version: "v4",
    auth: client as any,
  });
}

function rowsToObjects(rows: string[][]): Record<string, unknown>[] {
  if (!rows || rows.length === 0) return [];

  const headers = rows[0];
  const dataRows = rows.slice(1);

  return dataRows.map((r) => {
    const obj: Record<string, unknown> = {};

    headers.forEach((h, i) => {
      let value: unknown = r[i] !== undefined ? r[i] : "";

      // Clean markdown image format: [text](url)
      if (h === "image" && typeof value === "string") {
        const urlMatch = value.match(/\[(.*?)\]\((.*?)\)/);
        if (urlMatch) {
          value = urlMatch[2];
        }
      }

      obj[h] = value;
    });

    // Convert numeric fields safely
    ["price", "id", "rating", "reviews"].forEach((field) => {
      const val = obj[field];
      if (val !== undefined && val !== "") {
        const n = Number(val);
        obj[field] = isNaN(n) ? val : n;
      }
    });

    return obj;
  });
}

export const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: "Method Not Allowed",
    };
  }

  try {
    if (!SPREADSHEET_ID) {
      throw new Error("Missing SPREADSHEET_ID");
    }

    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "offers2",
    });

    const rows = (response.data.values || []) as string[][];
    const offers = rowsToObjects(rows);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ offers }),
    };
  } catch (error) {
    const err = error as Error;

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Error reading offers2 sheet",
        details: err.message,
      }),
    };
  }
};