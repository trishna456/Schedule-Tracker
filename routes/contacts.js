const express = require('express');
const router = express.Router();

//@route   GET api/contacts
//@desc    Get a contact
//@access  Public
router.get('/', (req, res) => res.send('get all contacts'));

//@route   POST api/contacts
//@desc    Add a contact
//@access  Public
router.post('/', (req, res) => res.send('post a contact'));

//@route   PUT api/contacts/:id
//@desc    Update a contact
//@access  Public
router.put('/:id', (req, res) => res.send('update a contact'));

//@route   DELETE api/contacts/:id
//@desc    Deletes a contact
//@access  Public
router.delete('/:id', (req, res) => res.send('deletes a contact'));

module.exports = router;
