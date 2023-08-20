import React from 'react';

import PropTypes from 'prop-types';
import ContactItem from './ContactItem';
import style from './ContactList.module.css';

export default function ContactList({ contacts, deleteContact }) {
  return (
    <ul className={style.list}>
      {contacts &&
        contacts.map(contact => {
          return (
            <ContactItem
              deleteContact={deleteContact}
              key={contact.id}
              contact={contact}
            />
          );
        })}
    </ul>
  );
}
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};
