const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Модель користувача
require('dotenv').config();

router.post('/send-reset-email', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Генерація токена для скидання паролю
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_RESET,
      { expiresIn: '1h' }
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // Налаштування транспорту для надсилання листів
    const transporter = nodemailer.createTransport({
      service: 'brevo', // або будь-який інший сервіс
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Скидання пароля',
      html: `
        <p>Hello, ${user.name || 'user'}!</p>
        <p>To reset your password, follow this link:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>The link is valid for one hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;

const bcrypt = require('bcrypt');

router.post('/reset-pwd', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }

  try {
    // Перевірка токена
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Хешування нового паролю
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Token has expired' });
    }
    res.status(500).json({ message: 'Failed to reset password' });
  }
});