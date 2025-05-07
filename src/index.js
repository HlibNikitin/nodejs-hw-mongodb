import dotenv from 'dotenv';
dotenv.config();

import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/contacts.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

await initMongoConnection();
await createDirIfNotExists(TEMP_UPLOAD_DIR);
await createDirIfNotExists(UPLOAD_DIR);
setupServer();
