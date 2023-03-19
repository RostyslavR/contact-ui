import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContacts } from 'redux/filter/selectors';
import { EditContactForm } from 'components/Forms/EditContactForm';
import { deleteContact, favoriteContact } from 'redux/contacts/operations';

import {
  IconButton,
  HStack,
  Stack,
  Text,
  Box,
  Checkbox,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <Box p={4}>
      <Stack maxH="290px" maxW="full" p="1" overflowY="auto">
        {contacts.map(contact => (
          <Contact key={contact._id} {...contact}></Contact>
        ))}
      </Stack>
    </Box>
  );
};

const Contact = contact => {
  const { _id, name, email, phone, favorite } = contact;
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(_id));
  const handleFavorite = () =>
    dispatch(favoriteContact({ contactId: _id, newFavorite: !favorite }));

  return (
    <HStack spacing={3}>
      <Checkbox
        id="favorite"
        name="favorite"
        // icon={<StarIcon />}
        onChange={handleFavorite}
        isChecked={favorite}
        colorScheme="teal"
      ></Checkbox>
      <Text fontSize="2xl" w={200} flexGrow={1}>
        {name}
      </Text>
      <Text fontSize="xl" w={200}>
        {phone}
      </Text>
      <Text fontSize="xl" w={200}>
        {email}
      </Text>
      <EditContactForm {...contact} />
      <IconButton
        aria-label="delete contact"
        icon={<DeleteIcon />}
        colorScheme="teal"
        onClick={handleDelete}
      >
        Delete
      </IconButton>
    </HStack>
  );
};
