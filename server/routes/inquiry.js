const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const Inquiry = require('../models/Inquiry');

const resendApiKey = process.env.EMAIL_PASS || process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

router.post('/', async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    // 1. Database mein save karein
    const inquiry = new Inquiry({ name, phone, message: message || '' });
    await inquiry.save();

    // 2. Response turant bhej dein
    res.status(201).json({ success: true, message: 'Inquiry submitted' });

    // 3. Resend API (HTTP) se email bhejien
    (async () => {
      if (!resend || !process.env.EMAIL_TO) {
        console.log('Email service not configured; skipping notification email');
        return;
      }

      try {
        await resend.emails.send({
          from: 'Ayodhya Estate <onboarding@resend.dev>',
          to: process.env.EMAIL_TO,
          subject: '🕉️ New Inquiry - Ayodhya Estate',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
              <h2>🕊️ New Inquiry Request</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Message:</strong> ${message || 'No message'}</p>
              <p>Jai Shri Ram! 🙏</p>
            </div>
          `
        });
        console.log('Email sent successfully via Resend API');
      } catch (emailError) {
        console.error('Resend API Error:', emailError);
      }
    })();

  } catch (error) {
    console.error('Inquiry submission error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

// Admin ke liye inquiries fetch karne ka route
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }
});

module.exports = router;
