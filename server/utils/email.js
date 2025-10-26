// Email utility functions
// You can use nodemailer or other email services here

const sendEmail = async (to, subject, text, html) => {
  // TODO: Implement email sending logic
  console.log('Sending email to:', to);
  console.log('Subject:', subject);
  console.log('Text:', text);
  return true;
};

module.exports = {
  sendEmail,
};
