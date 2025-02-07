// send-email.js (backend endpoint or serverless function)
const sgMail = require('@sendgrid/mail');

// Set the SendGrid API key
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

const sendEmail = async (email, subject, message) => {
  const msg = {
    to: email,
    from: 'your-email@example.com',  // Use your verified email address from SendGrid
    subject: subject,
    text: message,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
