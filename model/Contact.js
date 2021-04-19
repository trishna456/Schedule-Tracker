const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  slot: {
    type: String,
  },
});

module.exports = mongoose.model('contacts', ContactSchema);
