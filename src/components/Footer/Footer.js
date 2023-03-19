import { Box, Container, Flex, useColorMode } from '@chakra-ui/react';

const Footer = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      as="footer"
      p={4}
      bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
      fontSize="xl"
    >
      <Container maxW="container.lg">
        <Flex justifyContent="center" alignItems="center">
          2023
        </Flex>
      </Container>
    </Box>
  );
};
export { Footer };
