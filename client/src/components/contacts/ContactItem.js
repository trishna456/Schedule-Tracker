import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/ContactContext';
import { Link } from 'react-router-dom';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const { firstName, lastName, phone, _id, email } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div>
      <h4 className='text-dark text-left'>
        {firstName.charAt(0).toUpperCase() + firstName.slice(1)}{' '}
        {lastName.charAt(0).toUpperCase() + lastName.slice(1)}
      </h4>
      <ul>
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <ul>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <Link to='/'>
          <button className='btn btn-danger btn-sm' onClick={onDelete}>
            Delete
          </button>
        </Link>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
