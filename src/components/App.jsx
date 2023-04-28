import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CONTACT, DELETE_CONTACT } from '../redux/store';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactList/ContactsList';

// const STORAGE_KEY = 'contacts';

// const useLocalStorage = (key, defaultValue) => {
//   const [state, setState] = useState(() => {
//     return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
//   });

//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(state));
// }, [key, state])
  
//   return [state, setState]
// }
export const App = () => {
  const phonebookContacts = useSelector(state => state.phonebook)
  console.log(phonebookContacts)
  // const [contacts, setContacts] = useLocalStorage(STORAGE_KEY, [])
  const [filter, setFilter] = useState('')
  const dispatch = useDispatch()

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

  // const addContact = (contactName, contactNumber) => {
  //   const contact = {
  //     name: contactName,
  //     number: contactNumber,
  //   };
  //   setContacts(prevState => [contact, ...prevState]);
  // };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return phonebookContacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    // setContacts(prevState => {
    //   return prevState.filter(
    //     contact => contactId !== contact.name
    // )});
    dispatch(DELETE_CONTACT(contactId))
  };

    const filteredConctacts = getFilteredContacts();

    return (
      <>
        <div className="container">
          <h1 className="phonebook__title title">PhoneBook</h1>
          <Form onSubmit={formSubmitHandler} />
          <h2 className="contact-list__title title">Contacts</h2>
          <Filter filter={filter} onChange={changeFilter} />
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
