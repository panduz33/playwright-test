import dotenv from 'dotenv';

// Load .env only if running locally
if (process.env.CI !== 'true') {
  dotenv.config();
}

// Validate environment variables
const requiredVars = ['BASE_URL', 'STANDARD_USER', 'LOCKED_OUT_USER', 'PROBLEM_USER', 'PERFORMANCE_GLITCH_USER', 'PASSWORD'];

for (const key of requiredVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const BASE_URL = getEnv('BASE_URL');
export const STANDARD_USER = getEnv('STANDARD_USER');
export const LOCKED_OUT_USER = getEnv('LOCKED_OUT_USER');
export const PROBLEM_USER = getEnv('PROBLEM_USER');
export const PERFORMANCE_GLITCH_USER = getEnv('PERFORMANCE_GLITCH_USER');
export const PASSWORD = getEnv('PASSWORD');
