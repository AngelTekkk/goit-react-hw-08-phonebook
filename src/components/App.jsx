import React, { useState } from 'react';
import { useFetchContactsQuery } from '../redux';
import { Filter, ContactList, Section, ContactForm } from './index';

export default function App() {
  const { data: contacts } = useFetchContactsQuery();

  const [filter, setFilter] = useState('');
  const handleFilterChange = ({ target: { value } }) => {
    setFilter(value);
  };
  const normalizedFilter = filter.trim().toLowerCase();
  const visibleContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <>
      <Section title="Phonebook">
        <ContactForm contacts={contacts} />
      </Section>
      <Section title="Contacts">
        <Filter filter={filter} onChange={handleFilterChange} />
        <ContactList visibleContacts={visibleContacts} />
      </Section>
    </>
  );
}
