import React, { useReducer } from 'react';
import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';
import axios from 'axios';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_SLOT,
  CONTACT_ERROR,
  GET_CONTACTS,
  SET_LOADING,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    slot: null,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Get contacts
  const getContacts = async () => {
    try {
      setLoading();
      const res = await axios.get('/api/contacts');
      setLoading();
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      setLoading();
      const res = await axios.post('/api/contacts', contact, config);
      setLoading();
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Update contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      setLoading();
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      setLoading();
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Delete contact
  const deleteContact = async (id) => {
    try {
      setLoading();
      await axios.delete(`/api/contacts/${id}`);
      setLoading();
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Set current contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //set slot
  const setSlot = (slot) => {
    dispatch({ type: SET_SLOT, payload: slot });
  };

  //set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        slot: state.slot,
        error: state.error,
        loading: state.loading,
        setLoading,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        setSlot,
        getContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
