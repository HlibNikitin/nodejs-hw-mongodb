const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const Contact = require('../models/Contact');

// Створення контакту з фото
router.post('/contacts', upload.single('photo'), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const photoUrl = req.file?.path;

    const newContact = new Contact({
      name,
      email,
      phone,
      photo: photoUrl,
    });

    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create contact' });
  }
});

// Оновлення контакту з можливістю змінити фото
router.patch('/contacts/:contactId', upload.single('photo'), async (req, res) => {
  try {
    const { contactId } = req.params;
    const updateData = req.body;

    if (req.file) {
      updateData.photo = req.file.path;
    }

    const updatedContact = await Contact.findByIdAndUpdate(contactId, updateData, {
      new: true,
    });

    if (!updatedContact) return res.status(404).json({ message: 'Contact not found' });

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update contact' });
  }
});

module.exports = router;
