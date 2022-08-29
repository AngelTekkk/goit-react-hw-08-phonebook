import React from 'react';
import ContactListItem from 'components/ContactListItem/ContactListItem';
import s from './ContactList.module.css';

export default function ContactList({ visibleContacts }) {
  return (
    <ul className={s.list}>
      {visibleContacts &&
        visibleContacts.map(({ id, name, phone }) => {
          return <ContactListItem key={id} contact={{ id, name, phone }} />;
        })}
    </ul>
  );
}
