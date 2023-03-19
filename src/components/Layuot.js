import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Talker } from 'components/Talker';

const Layout = () => {
  return (
    <Box
      display="Flex"
      flexDirection="column"
      // maxWidth="960"
      minHeight="100vh"
      margin="0 auto"
      padding="0 16px"
    >
      <Header />
      <Box as="main" flexGrow={1}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Box>
      <Talker duration="3000" isClosable="true" position="top" />
      <Footer />
    </Box>
  );
};

export { Layout };
