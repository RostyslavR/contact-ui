import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';
import { useFormik } from 'formik';
import { useToast } from '@chakra-ui/react';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const initialValues = {
  name: '',
  email: '',
  phone: '',
};

const AddContactForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const toast = useToast();

  const onCancel = () => {
    formik.resetForm();
    onClose();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      const isOnList = contacts.find(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      );
      if (isOnList) {
        return toast({
          duration: 2000,
          isClosable: true,
          title: `${values.name} this contact already exists`,
          status: 'info',
          position: 'top',
        });
        // alert(`${values.name} this contact already exists`);
      }
      dispatch(addContact(values));
      formik.resetForm();
      onClose();
    },
  });

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Add new contact
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onCancel}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new contact</DrawerHeader>
          <form onSubmit={formik.handleSubmit}>
            <DrawerBody>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Type here name"
                    autoFocus
                    required
                    variant="flushed"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Type email here"
                    required
                    variant="flushed"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Type here phone"
                    required
                    variant="flushed"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                </FormControl>
              </VStack>
            </DrawerBody>
            <DrawerFooter>
              <Button
                variant="outline"
                aria-label="cancel"
                mr={3}
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button type="submit" aria-label="add contact" colorScheme="teal">
                Add
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { AddContactForm };
