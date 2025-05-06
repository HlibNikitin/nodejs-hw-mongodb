import dotenv from 'dotenv';

dotenv.config();

export const getEnvVar = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing: process.env['${name}']`);
  }
  return value;
};
