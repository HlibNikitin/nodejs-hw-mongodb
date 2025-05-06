import createHttpError from 'http-errors';
import { getALLContacts, getContactById, createContact, deleteContact, updateContact } from "../services/contacts.js";
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res, next) => {
      const { page, perPage } = parsePaginationParams(req.query);
      const { sortBy, sortOrder } = parseSortParams(req.query);
      const filter = parseFilterParams(req.query);
      const userId = req.user._id;
      console.log(`ID: ${userId}`);

      const contacts = await getALLContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
        userId
      });

      if (contacts.data.length === 0) {
        throw createHttpError(404, 'Contacts not found');
      }

      res.json({
      status: 200,
      data: contacts,
      message: "Successfully found contacts!"
    });
  };

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactById(contactId, userId);

    if(!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.json({
        status: 200,
        data: contact,
        message: `Successfully found contact with id ${contactId}!`
      });
    };

export const createContactController = async (req, res) => {
  const photo = req.file;
  console.log(req.file);
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contactData = {
    ...req.body,
    userId: req.user._id,
    photo: photoUrl,
  };

  const contact = await createContact(contactData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await deleteContact(contactId, userId);

  if(!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
  };

export const patchContactController = async (req, res, next) => {
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const { contactId } = req.params;
  const userId = req.user._id;
  const result = await updateContact(contactId, {
    ...req.body,
    photo: photoUrl,
  }, userId);

  if(!result) {
    next(createHttpError(404, 'Not Found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

