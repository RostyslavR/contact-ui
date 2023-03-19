import { Box, Container, Heading } from '@chakra-ui/react';

const Home = () => {
  return (
    <Container maxW="container.lg">
      <Box as="main">
        <Heading size="2xl">Home page</Heading>
      </Box>
    </Container>
  );
};

export default Home;
