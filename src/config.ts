import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

export const isTestMode = process.argv.includes('--test');

export const KEY_FILE_PATH = path.join(process.cwd(), '.key');

const requiredEnvVars = [
  'ENCRYPTION_KEY',
  'DRPC_ENDPOINT'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const DEFAULT_CONTRACT_ADDRESS = '0xcd4f1cd738cf862995239b5b7d9ff09cffc22399';
const DEFAULT_PRIORITY_FEE = 20;
const DEFAULT_MAX_FEE = 2;

export const config = {
  encryptionKey: process.env.ENCRYPTION_KEY as string,
  drpcEndpoint: process.env.DRPC_ENDPOINT as string,

  contractAddress: DEFAULT_CONTRACT_ADDRESS,
  priorityFee: DEFAULT_PRIORITY_FEE,
  maxFee: DEFAULT_MAX_FEE
};

export function keyFileExists(): boolean {
  return fs.existsSync(KEY_FILE_PATH);
}