import React, { useState, useContext, useEffect, Fragment } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import { useHistory } from 'react-router';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const {
    addContact,
    current,
    clearCurrent,
    updateContact,
    slot,
  } = contactContext;

  useEffect(() => {
    if (current !== null) setContact(current);
    else
      setContact({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        slot: slot,
      });
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    slot: slot,
  });

  const { firstName, lastName, email, phone } = contact;
  const history = useHistory();
  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current == null) addContact(contact);
    else updateContact(contact);
    clearAll();
    history.push('/');
  };

  const clearAll = () => {
    clearCurrent();
    setContact({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      slot: '',
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='First Name'
        name='firstName'
        required={true}
        value={firstName}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Last Name'
        name='lastName'
        value={lastName}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email ID'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone Number'
        value={phone}
        required={true}
        name='phone'
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
