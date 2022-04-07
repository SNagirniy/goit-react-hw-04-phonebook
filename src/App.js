import { useState } from 'react';
import Container from 'components/Container';
import Section from 'components/Section';
import ContactForm from 'components/ContactForm';
import Contactlist from 'components/Contactlist';
import Filter from 'components/Filter';
import Notification from 'components/Notification';

import useLocalStorage from 'hooks/useLocaleStortage';
import shortid from 'shortid';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const item = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (item) {
      alert(`${name} is already in contacts.`);
      return;
    }

    return setContacts(prevContacts => [...prevContacts, contact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = id => {
    setContacts(() => contacts.filter(contact => contact.id !== id));
  };

  return (
    <Container>
      <Section title={'Phonebook'}>
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title={'Contacts'}>
        {contacts.length > 0 && (
          <Filter value={filter} onChange={changeFilter} />
        )}
        {contacts.length > 0 ? (
          <Contactlist data={getVisibleContacts()} onDelete={deleteContact} />
        ) : (
          <Notification
            text={'There are no contacts in Your phonebook . . .'}
          />
        )}
      </Section>
    </Container>
  );
}
