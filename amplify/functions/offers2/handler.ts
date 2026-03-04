
const { google } = require("googleapis");

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function getSheetsClient() {
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const client = await auth.getClient();
  return google.sheets({ version: "v4", auth: client });
}

function rowsToObjects(rows) {
  if (!rows || rows.length === 0) return [];
  const headers = rows[0];
  const dataRows = rows.slice(1);
  return dataRows.map(r => {
    const obj = {};
    headers.forEach((h, i) => {
      let value = r[i] !== undefined ? r[i] : "";
      
      // ✅ CLEAN IMAGE URLS - Remove markdown [text](url)
      if (h === "image" && typeof value === "string") {
        const urlMatch = value.match(/\\[(.*?)\\]\\((.*?)\\)/);
        if (urlMatch) {
          value = urlMatch[2]; // Extract URL from markdown
        }
      }
      
      obj[h] = value;
    });
    
    // Number conversions
    if (obj.price !== undefined && obj.price !== "") {
      const n = Number(obj.price);
      obj.price = isNaN(n) ? obj.price : n;
    }
    if (obj.id !== undefined && obj.id !== "") {
      const n = Number(obj.id);
      obj.id = isNaN(n) ? obj.id : n;
    }
    if (obj.rating !== undefined && obj.rating !== "") {
      const n = Number(obj.rating);
      obj.rating = isNaN(n) ? obj.rating : n;
    }
    if (obj.reviews !== undefined && obj.reviews !== "") {
      const n = Number(obj.reviews);
      obj.reviews = isNaN(n) ? obj.reviews : n;
    }
    return obj;
  });
}

exports.handler = async function (event, context) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,OPTIONS" },
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const sheets = await getSheetsClient();
    const range = "offers2";
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });
    const rows = response.data.values || [];
    const offers = rowsToObjects(rows);

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ offers }),
    };
  } catch (err) {
    console.error("Error reading offers2 sheet:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Error reading offers2 sheet", details: String(err) }),
    };
  }
};

