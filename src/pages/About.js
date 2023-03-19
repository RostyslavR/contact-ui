import { Outlet, Link } from 'react-router-dom';
import { Container, Heading, List, ListItem, ListIcon } from '@chakra-ui/react';
import { SunIcon } from '@chakra-ui/icons';

const About = () => {
  return (
    <Container maxW="container.lg">
      <Heading size="2xl">About us</Heading>
      <List>
        <ListItem>
          <ListIcon as={SunIcon} color="green.500" />
          <Link to="projects">Our projects</Link>
        </ListItem>
        <ListItem>
          <ListIcon as={SunIcon} color="green.500" />
          <Link to="team">Our team</Link>
        </ListItem>
      </List>
      <Outlet />
    </Container>
  );
};
export default About;
