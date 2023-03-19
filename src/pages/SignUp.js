import { Box, Container, Heading } from '@chakra-ui/react';
import { SignUpForm } from 'components/Forms/SignUpForm';

const SignUp = () => {
  return (
    <Container maxW="container.lg">
      <Box as="main">
        <Heading size="2xl">Sign up page </Heading>
        <SignUpForm />
      </Box>
    </Container>
  );
};

export default SignUp;
