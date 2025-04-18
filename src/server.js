import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { getContacts, getContactsById } from './services/contacts.js';

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.get('/contacts', async (req, res) => {
    const data = await getContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });
  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;

    const data = await getContactsById(id);
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });
  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
    next();
  });
  const port = Number(getEnvVar('PORT', 3000));
  app.listen(port, () => console.log(`Server starting on ${port} port`));
};
