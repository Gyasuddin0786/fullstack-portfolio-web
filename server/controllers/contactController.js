const { validationResult } = require('express-validator');
const Message = require('../models/Message');
const User = require('../models/User');
const sendEmail = require('../utils/email');

// @desc    Send contact message
// @route   POST /api/v1/contact
// @access  Public
const sendContactMessage = async (req, res) => {
  try {
    console.log('Contact form submission:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Save message to database
    console.log('Saving message to database...');
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message
    });
    console.log('Message saved successfully:', newMessage._id);

    // Try to send emails (optional - won't fail if email not configured)
    try {
      const owner = await User.findOne({ role: 'owner' });
      console.log('Owner found:', owner ? owner.email : 'No owner');
      
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        // Send notification to admin
        if (owner) {
          console.log('Sending admin notification...');
          const adminEmailHtml = `
            <h2>📨 New Contact Message</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>From:</strong> ${name} (${email})</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p><small>Sent from your portfolio website - ${new Date().toLocaleString()}</small></p>
          `;

          await sendEmail({
            email: owner.email,
            subject: `📨 Portfolio Contact: ${subject}`,
            html: adminEmailHtml
          });
          console.log('Admin notification sent successfully');
        }

        // Send confirmation to user
        console.log('Sending user confirmation...');
        const userConfirmationHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Message Received - Thank You!</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">✅ Message Received!</h1>
              <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Thank you for contacting us</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
              <h2 style="color: #4CAF50; margin-top: 0;">🙏 Hi ${name}!</h2>
              <p>Thank you for reaching out! We have successfully received your message and will get back to you as soon as possible.</p>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; border-left: 4px solid #4CAF50; margin-bottom: 25px;">
              <h3 style="color: #2e7d32; margin-top: 0;">📋 Your Message Summary:</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
            </div>
            
            <div style="text-align: center; padding: 20px; background: #f5f5f5; border-radius: 10px;">
              <p style="margin: 0; color: #666;">We typically respond within 24-48 hours ⏰</p>
              <p style="margin: 10px 0 0 0; color: #666;">Best regards,<br><strong>Portfolio Team</strong></p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">This is an automated confirmation from the portfolio contact system.</p>
            </div>
          </body>
          </html>
        `;

        await sendEmail({
          email: email,
          subject: `✅ Thank you for contacting us - Message Received`,
          html: userConfirmationHtml
        });
        console.log('User confirmation sent successfully');
      } else {
        console.log('Email not configured');
      }
    } catch (emailError) {
      console.log('Email sending failed (optional):', emailError.message);
      // Continue without failing - message is still saved to database
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
};

module.exports = {
  sendContactMessage
};