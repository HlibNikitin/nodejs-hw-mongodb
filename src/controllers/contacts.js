import createHttpError from 'http-errors';
import {
  deleteContact,
  getContacts,
  getContactsById,
  patchContact,
  postContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getContactController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const data = await getContacts({ page, perPage, sortBy, sortOrder });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await getContactsById(id);
  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};

export const postContactsController = async (req, res) => {
  const contacts = await postContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contacts,
  });
};

export const patchContactsController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await patchContact(id, req.body);

  if (!contact) {
    console.log(contact);
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  const contacts = await deleteContact(id, req.body);
  if (!contacts) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully delete a contact!',
  });
};
