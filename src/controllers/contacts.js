import {
  deleteContact,
  getContacts,
  getContactsById,
  patchContact,
  postContact,
} from '../services/contacts.js';

export const getContactController = async (req, res) => {
  const contacts = await getContacts();
  res.status(200).json({
    status: "success",
    code: 200,
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactsById(id);

  if (!contact) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Contact not found",
    });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: contact,
  });
};

export const postContactsController = async (req, res) => {
  const newContact = await postContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: newContact,
  });
};

export const patchContactsController = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await patchContact(id, req.body);

  if (!updatedContact) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Contact not found",
    });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: updatedContact,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const result = await deleteContact(id);

  if (!result) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Contact not found",
    });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact deleted",
  });
};
