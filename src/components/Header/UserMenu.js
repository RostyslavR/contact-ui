import { HStack } from '@chakra-ui/react';
import { ColorModeSwitcher } from 'components/ColorModeSwitcher';
import { NavLink } from 'react-router-dom';
import { signOut, remove } from 'redux/user/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectIsSignedIn } from 'redux/user/selectors';
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const UserMenu = () => {
  const user = useSelector(selectUser);
  const isSignedIn = useSelector(selectIsSignedIn);
  const dispatch = useDispatch();

  return (
    <HStack spacing={4}>
      {isSignedIn ? (
        <>
          {/* Wrap Menu in the Box this is need still  */}
          <Box>
            <Menu>
              <MenuButton
                px={2}
                py={2}
                // transition="all 0.2s"
                borderRadius="md"
                // fontSize="2xl"
                variant="ghost"
                color="teal.400"
                // color="current"
                // borderWidth="1px"
                // _hover={{ bg: 'gray.500' }}
                _expanded={{ bg: 'grey.200' }}
                // _focus={{ boxShadow: 'outline' }}
              >
                {user.name} <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem as="a" href="#">
                  Edit profile
                </MenuItem>
                <MenuItem as="a" href="/" onClick={() => dispatch(remove())}>
                  Delete user
                </MenuItem>
                <MenuDivider />
                <MenuItem as="a" href="/" onClick={() => dispatch(signOut())}>
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <NavLink to="/" onClick={() => dispatch(signOut())}>
            Sign Out
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/signup">SignUp</NavLink>
          <NavLink to="/signin">SignIn</NavLink>
        </>
      )}
      <ColorModeSwitcher />
    </HStack>
  );
};

// <Menu>
// </Menu>;

// {
//   /* <Text color="teal.400" fontSize="2xl"> */
// }
// {
//   /* {user.name} */
// }
// {
//   /* </Text> */
// }
