import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/operations';
import { selectContactsIsLoading } from 'redux/contacts/selectors';

import {
  Divider,
  Heading,
  Container,
  Flex,
  Box,
  Progress,
} from '@chakra-ui/react';
import { AddContactForm } from 'components/Forms/AddContactForm';
import { ContactFilter } from 'components/ContsctFilter';
import { ContactList } from 'components/ContactList';

const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectContactsIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container maxW="container.lg">
      <Flex justifyContent="space-between" p={4}>
        <Heading>Contacts</Heading>
        <AddContactForm />
      </Flex>
      <Box minH={1}>{isLoading && <Progress size="xs" isIndeterminate />}</Box>
      <Divider mb={2} />
      <ContactFilter />
      <Divider />
      <ContactList />
      <Divider />
    </Container>
  );
};

export default Contacts;
