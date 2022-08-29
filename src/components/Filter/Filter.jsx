import React from 'react';
import s from './Filter.module.css';

export default function Filter({ filter, onChange }) {
  return (
    <label className={s.label}>
      <input
        className={s.input}
        type="text"
        name="filter"
        placeholder="Find contacts by name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={filter}
        onChange={onChange}
      />
    </label>
  );
}
