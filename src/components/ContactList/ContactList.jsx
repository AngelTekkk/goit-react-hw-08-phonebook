import React from 'react';
import PropTypes from 'prop-types';
import ContactListItem from 'components/ContactListItem/ContactListItem';
import s from './ContactList.module.css';

export default function ContactList({ visibleContacts }) {
  return (
    <ul className={s.list}>
      {visibleContacts &&
        visibleContacts.map(({ id, name, number }) => {
          return <ContactListItem key={id} contact={{ id, name, number }} />;
        })}
    </ul>
  );
}

ContactList.propTypes = {
  visibleContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
