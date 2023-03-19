import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useToast } from '@chakra-ui/react';
import { editContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';

import {
  IconButton,
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

import { EditIcon } from '@chakra-ui/icons';

const EditContactForm = ({ _id, name, email, phone }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const toast = useToast();

  let initialValues = {
    _id,
    name,
    email,
    phone,
  };

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

      dispatch(editContact(values));
      onClose();
    },
  });

  return (
    <>
      <IconButton
        aria-label="edit contact"
        icon={<EditIcon />}
        colorScheme="teal"
        onClick={onOpen}
      >
        Edit
      </IconButton>

      {/* <Button colorScheme="teal" onClick={onOpen}>
        Edit
      </Button> */}

      <Drawer isOpen={isOpen} placement="right" onClose={onCancel}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit contact</DrawerHeader>
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
                    // value={formik.values.name}
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
              <Button
                type="submit"
                aria-label="edit contact"
                colorScheme="teal"
              >
                Edit
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { EditContactForm };
