import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserStatus } from 'redux/user/selectors';
import { selectContactsStatus } from 'redux/contacts/selectors';

export const Talker = props => {
  const toast = useToast();
  const userStatus = useSelector(selectUserStatus);
  const contactsStatus = useSelector(selectContactsStatus);

  useEffect(() => {
    if (!userStatus) {
      return;
    }
    toast({
      ...props,
      ...userStatus,
    });
  }, [userStatus, props, toast]);

  useEffect(() => {
    if (!contactsStatus) {
      return;
    }
    toast({
      ...props,
      ...contactsStatus,
    });
  }, [contactsStatus, props, toast]);
};
