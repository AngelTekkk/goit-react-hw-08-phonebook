import { useState } from 'react';
import { useGetContactsQuery } from '../redux';
import { Filter, ContactList, Section, ContactForm } from '../components/index';

export default function Contacts() {
  const { data: contacts } = useGetContactsQuery();

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
      <div className="pt-20 bg-white dark:bg-gray-300 h-screen">
        <Section title="Phonebook">
          <ContactForm contacts={contacts} />
        </Section>
        <Section title="Contacts">
          <Filter filter={filter} onChange={handleFilterChange} />
          <ContactList visibleContacts={visibleContacts} />
        </Section>
      </div>
    </>
  );
}
