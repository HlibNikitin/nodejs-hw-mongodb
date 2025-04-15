import { SORT_ORDER } from '../constants/index.js';
import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASG,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactQuery = ContactCollection.find();
  const contactsCount = await ContactCollection.find()
    .merge(contactQuery)
    .countDocuments();

  const contacts = await contactQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactsById = (id) => ContactCollection.findOne({ _id: id });

export const postContact = (payload) => ContactCollection.create(payload);

export const patchContact = async (id, payload, options = {}) => {
  const result = await ContactCollection.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  console.log(result);

  if (!result || !result.value) return null;
  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

export const deleteContact = (id) =>
  ContactCollection.findOneAndDelete({ _id: id });
