import React from 'react';
import { useDeleteContactMutation, useEditContactMutation } from '../../redux';
import { Blocks } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import s from './ContactListItem.module.css';

export default function ContactListItem({ contact: { id, name, number } }) {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  const [editContact, { isLoading: isEditing }] = useEditContactMutation();

  const onDeleteContact = (id, name) => {
    Notify.info(`${name} is deleted from contacts.`);
    deleteContact(id);
  };

  const onEditContact = (id, name, number) => {
    console.log(id, name, number);
    editContact({ id, name, number });
  };

  return (
    <>
      <li className={s.item}>
        <p>
          {name}: {number}
        </p>
        {/* <button
          className={s.button}
          type="button"
          onClick={() => onEditContact(id, name, number)}
          disabled={isLoading}
        >
          {isLoading ? <Blocks height={20} /> : 'Edit'}
        </button> */}
        <button
          className={s.button}
          type="button"
          onClick={() => onDeleteContact(id, name)}
          disabled={isLoading}
        >
          {isLoading ? <Blocks height={20} /> : 'Delete'}
        </button>
      </li>
    </>
  );
}

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};
