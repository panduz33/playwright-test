import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

function getEnv(key) {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

export const BASE_URL = getEnv('BASE_URL');
export const STANDARD_USER = getEnv('STANDARD_USER');
export const LOCKED_OUT_USER = getEnv('LOCKED_OUT_USER');
export const PROBLEM_USER = getEnv('PROBLEM_USER');
export const PERFORMANCE_GLITCH_USER = getEnv('PERFORMANCE_GLITCH_USER');
export const PASSWORD = getEnv('PASSWORD');
