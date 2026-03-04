import { Amplify } from 'aws-amplify';

let outputs = {};

try {
  Amplify.configure(outputs);
} catch (e) {
  console.warn('Amplify outputs not found. Using fallback configuration.');
}

// Base API URL from environment variable
const API_BASE = 'https://2qw2kz99uc.execute-api.ap-south-1.amazonaws.com/prod';

// API function URLs
export const API_ROUTES = {
  offers:            `${API_BASE}/offers`,
  offers2:           `${API_BASE}/offers2`,
  adminOffers:       `${API_BASE}/adminOffers`,
  saveCookieConsent: `${API_BASE}/saveCookieConsent`,
};

export const API_ENDPOINT = API_BASE;
export default API_ROUTES;
