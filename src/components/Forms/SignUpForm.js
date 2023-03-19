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
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from 'redux/user/operations';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export const SignUpForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCancel = () => {
    formik.resetForm();
    onClose();
    navigate('/');
  };

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      dispatch(signUp(values));
      // onClose();
      // navigate('/');
    },
  });

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onCancel}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Input your information</DrawerHeader>
          <form onSubmit={formik.handleSubmit}>
            <DrawerBody>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="name">Your Name</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Type your name here"
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
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    name="password"
                    type="text"
                    placeholder="Type password here"
                    required
                    // minlength="7"
                    autoComplete="off"
                    variant="flushed"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </FormControl>
              </VStack>
            </DrawerBody>
            <DrawerFooter>
              <Button
                variant="outline"
                mr={3}
                aria-label="cancel"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button type="submit" aria-label="sign up" colorScheme="teal">
                Sign Up
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};
