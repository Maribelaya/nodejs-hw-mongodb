// src/utils/googleOAuth.js
import { OAuth2Client } from 'google-auth-library';
import path from 'node:path';
import { readFile } from 'fs/promises';
import { getEnvVar } from './getEnvVar.js';
import createHttpError from 'http-errors';

/**
 * Ініціалізація Google OAuth2 клієнта
 */
export const initGoogleOAuthClient = async () => {
  const PATH_JSON = path.join(process.cwd(), 'google-oauth.json');
  const oauthConfigRaw = await readFile(PATH_JSON, 'utf-8');
  const oauthConfig = JSON.parse(oauthConfigRaw);

  const client = new OAuth2Client({
    clientId: getEnvVar('GOOGLE_AUTH_CLIENT_ID'),
    clientSecret: getEnvVar('GOOGLE_AUTH_CLIENT_SECRET'),
    redirectUri: oauthConfig.web.redirect_uris[0],
  });

  return client;
};

/**
 * Генерує URL для авторизації користувача
 * @param {OAuth2Client} client
 * @returns {string} URL авторизації
 */
export const generateAuthUrl = (client) =>
  client.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

/**
 * Валідує код авторизації та повертає loginTicket
 * @param {OAuth2Client} client
 * @param {string} code
 * @returns {Promise<import("google-auth-library").LoginTicket>}
 */
export const validateCode = async (client, code) => {
  const response = await client.getToken(code);
  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');

  const ticket = await client.verifyIdToken({
    idToken: response.tokens.id_token,
  });

  return ticket;
};

/**
 * Повертає повне ім'я користувача з payload Google токена
 * @param {object} payload
 * @returns {string}
 */
export const getFullNameFromGoogleTokenPayload = (payload) => {
  let fullName = 'Guest';
  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }
  return fullName;
};
