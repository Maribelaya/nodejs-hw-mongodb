const contactService = require('../services/contacts');

const getContacts = async (req, res, next) => {
  try {
    const contacts = await contactService.getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error); // передаємо далі в глобальний error handler
  }
};

module.exports = {
  getContacts,
};
