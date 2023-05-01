import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CONTACT, DELETE_CONTACT } from '../redux/phoneBook';
import { UPDATE_FILTER } from 'redux/filter';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactList/ContactsList';
import { getContacts, getFilter } from 'redux/selectors';

export const App = () => {
  const phonebookContacts = useSelector(getContacts);
  const filterSearch = useSelector(getFilter);
  const dispatch = useDispatch();

  const formSubmitHandler = data => {
    const { name, number } = data;
    checkNewContact(name, number);
  };

  const checkNewContact = (name, number) => {
    const isContactNameExist = phonebookContacts.some(
      contact => contact.name === name
    );
    const isContactNumberExist = phonebookContacts.some(
      contact => contact.number === number
    );

    isContactNameExist
      ? alert(`${name} is already in contacts`)
      : isContactNumberExist
      ? alert(`${number} is already in contacts`)
      : dispatch(ADD_CONTACT({ name, number }));
  };

  const changeFilter = ({ target: { value } }) => {
    dispatch(UPDATE_FILTER(value))
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filterSearch.toLowerCase();
    return phonebookContacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

  };

  const deleteContact = contactId => {
    dispatch(DELETE_CONTACT(contactId))
  };

    const filteredConctacts = getFilteredContacts();

    return (
      <>
        <div className="container">
          <h1 className="phonebook__title title">PhoneBook</h1>
          <Form onSubmit={formSubmitHandler} />
          <h2 className="contact-list__title title">Contacts</h2>
          <Filter filter={filterSearch} onChange={changeFilter} />
          {!!phonebookContacts.length && (
            <ContactsList
              contactsList={filteredConctacts}
              onDeleteContact={deleteContact}
            />
          )}
        </div>
      </>
    );
  }
