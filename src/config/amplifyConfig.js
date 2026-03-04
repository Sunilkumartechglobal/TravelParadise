import { Amplify } from 'aws-amplify';

let outputs = {};

//npm  Try to load amplify_outputs.json (generated after deployment)
try {
//  outputs = require('../amplify_outputs.json');
  // Configure Amplify with the outputs
  Amplify.configure(outputs);
} catch (e) {
  console.warn('Amplify outputs not found. Using fallback configuration.');
  // For local development without Amplify, you can set REACT_APP_API_URL
}

// Get API endpoint from Amplify outputs
const getApiEndpoint = () => {
  try {
    // Try to get from Amplify custom outputs
    if (outputs?.custom?.API?.endpoint) {
      return outputs.custom.API.endpoint;
    }
  } catch (e) {
    console.warn('Could not load Amplify outputs, using fallback');
  }
  
  // Fallback for local development or if outputs not available
  // For local development with Netlify functions, use relative path
  return process.env.REACT_APP_API_URL || '/.netlify/functions/';
};

export const API_ENDPOINT = getApiEndpoint();

// API function URLs
export const API_ROUTES = {
  offers: `${API_ENDPOINT}offers`,
  offers2: `${API_ENDPOINT}offers2`,
  adminOffers: `${API_ENDPOINT}adminOffers`,
  saveCookieConsent: `${API_ENDPOINT}saveCookieConsent`,
};

export default API_ROUTES;
