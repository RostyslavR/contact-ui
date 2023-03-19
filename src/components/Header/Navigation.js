import { NavLink, useNavigate } from 'react-router-dom';
import { HStack, Image } from '@chakra-ui/react';
import Logo from 'data/logo.svg';
import { useSelector } from 'react-redux';
import { selectIsSignedIn } from 'redux/user/selectors';

export const Navigation = () => {
  const navigate = useNavigate();
  const isSignedIn = useSelector(selectIsSignedIn);

  return (
    <HStack as="nav" spacing="4">
      <Image
        src={Logo}
        alt="logo"
        boxSize="50px"
        objectFit="cover"
        mr={4}
        cursor="pointer"
        onClick={() => {
          navigate('/');
        }}
      />
      <NavLink to="/about">About</NavLink>
      <NavLink to="/">Home</NavLink>
      {isSignedIn && <NavLink to="/contacts">Contacts</NavLink>}
      {isSignedIn && <NavLink to="/justlist">Just list</NavLink>}
    </HStack>
  );
};
