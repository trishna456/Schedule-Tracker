const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Contact = require('../model/Contact');

//@route   GET api/contacts
//@desc    Get a contact
//@access  Public
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find({ id: req.body.id });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route   POST api/contacts
//@desc    Add a contact
//@access  Public
router.post(
  '/',
  [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('phone', 'Contact number is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, phone, email, slot } = req.body;
    try {
      const newContact = new Contact({
        firstName,
        lastName,
        phone,
        email,
        slot,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route   PUT api/contacts/:id
//@desc    Update a contact
//@access  Public
router.put('/:id', async (req, res) => {
  const { firstName, lastName, phone, email, slot } = req.body;

  //build contact object
  const contactFields = {};
  if (firstName) contactFields.firstName = firstName;
  if (lastName) contactFields.lastName = lastName;
  if (phone) contactFields.phone = phone;
  if (email) contactFields.email = email;
  if (slot) contactFields.slot = slot;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) res.status(404).json({ msg: 'Contact not found!' });

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route   DELETE api/contacts/:id
//@desc    Deletes a contact
//@access  Public
router.delete('/:id', async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) res.status(404).json({ msg: 'Contact not found!' });

    contact = await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
