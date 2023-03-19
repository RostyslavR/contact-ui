import { selectContacts } from 'redux/contacts/selectors';

export const selectFilter = state => state.filter;

export const selectFilteredContacts = state => {
  const contacts = selectContacts(state);
  const filter = selectFilter(state);
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};
