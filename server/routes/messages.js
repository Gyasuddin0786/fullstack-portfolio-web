const express = require('express');
const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');
const sendEmail = require('../utils/email');
const auth = require('../middleware/auth');

const router = express.Router();

// @desc    Get all messages
// @route   GET /api/v1/messages
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Reply to message
// @route   POST /api/v1/messages/reply
// @access  Private
router.post('/reply', [
  auth,
  body('to').isEmail().withMessage('Valid email is required'),
  body('subject').trim().isLength({ min: 1 }).withMessage('Subject is required'),
  body('message').trim().isLength({ min: 1 }).withMessage('Message is required')
], async (req, res) => {
  try {
    console.log('Reply request received:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { to, subject, message } = req.body;
    console.log('Sending reply to:', to);

    // Check if email is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('Email not configured');
      return res.status(400).json({
        success: false,
        message: 'Email not configured. Please set up SMTP settings.'
      });
    }

    // Send reply email notification
    try {
      console.log('Preparing email...');
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reply from Portfolio Gyasuddin!</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">📧 New Reply from Gyasu!</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">You have received a response to your message</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; border-left: 4px solid #667eea; margin-bottom: 25px;">
            <h2 style="color: #667eea; margin-top: 0; font-size: 20px;">💬 Gyasu's Reply:</h2>
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
            <h3 style="color: #1976d2; margin-top: 0; font-size: 16px;">📋 Message Details:</h3>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <div style="text-align: center; padding: 20px; background: #f5f5f5; border-radius: 10px;">
            <p style="margin: 0; color: #666; font-size: 14px;">Thank you for contacting us! 🙏</p>
            <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">Best regards,<br><strong>${process.env.FROM_NAME || 'Portfolio Admin Team'}</strong></p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">This is an automated notification from the portfolio contact system.</p>
            <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">Please do not reply to this email directly.</p>
          </div>
        </body>
        </html>
      `;

      console.log('Sending email via sendEmail function...');
      await sendEmail({
        email: to,
        subject: `🔔 ${subject}`,
        html: emailHtml
      });
      
      console.log('Email sent successfully');
      res.status(200).json({
        success: true,
        message: 'Reply sent successfully'
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: emailError.message
      });
    }
  } catch (error) {
    console.error('Reply endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Delete message
// @route   DELETE /api/v1/messages/:id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;