import React from 'react';
import { useDeleteContactMutation } from '../../redux';
import { Blocks } from 'react-loader-spinner';
import { Notify } from 'notiflix';
import s from './ContactListItem.module.css';

export default function ContactListItem({ contact: { id, name, phone } }) {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const onDeleteContact = (id, name) => {
    Notify.info(`${name} is deleted from contacts.`);
    deleteContact(id, name);
  };

  return (
    <>
      <li className={s.item}>
        <p>
          {name}: {phone}
        </p>
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
