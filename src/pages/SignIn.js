import { useSelector } from 'react-redux';
import { selectUserIsLoading } from 'redux/user/selectors';
import { Box, Container, Heading, Progress } from '@chakra-ui/react';
import { SignInForm } from 'components/Forms/SignInForm';

const SignIn = () => {
  const isLoading = useSelector(selectUserIsLoading);
  return (
    <Container maxW="container.lg">
      <Box as="main">
        <Heading size="2xl">Sign in page </Heading>
        <SignInForm />
        <Box marginTop={10} minH={1}>
          {isLoading && <Progress size="xs" isIndeterminate />}
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
