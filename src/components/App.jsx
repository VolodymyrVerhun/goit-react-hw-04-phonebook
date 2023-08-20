import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import style from './App.module.css';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const LOCAL__KEY = 'localKey';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(LOCAL__KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL__KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const contact = contacts.find(contact => {
      return newContact.name === contact.name;
    });
    if (contact) {
      alert(`${contact.name} is already in contacts`);
    } else {
      setContacts(prevState => [...prevState, newContact]);
    }
  };

  const submitContacts = newContact => {
    const newContacts = {
      ...contacts,
      name: newContact.name,
      number: newContact.number,
      id: nanoid(),
    };
    addContact(newContacts);
  };

  const handleFilter = event => {
    setFilter(event.target.value);
  };
  const handleFilterContact = () => {
    if (contacts.length !== 0) {
      const normalizedFilter = filter.toLowerCase().trim();
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <div className={style.phonebook}>
      <h1 className={style.title}>Phonebook</h1>
      <ContactForm onSubmit={submitContacts} />
      <h2>Contacts</h2>
      <Filter onChange={handleFilter} />
      <ContactList
        deleteContact={deleteContact}
        contacts={handleFilterContact()}
      />
    </div>
  );
}
