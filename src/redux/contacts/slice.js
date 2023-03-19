import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  editContact,
  deleteContact,
  favoriteContact,
} from 'redux/contacts/operations';

import { signOut } from 'redux/user/operations';

const extraActions = [
  fetchContacts,
  addContact,
  editContact,
  deleteContact,
  favoriteContact,
];

const getActions = type => extraActions.map(action => action[type]);

const handlePending = state => {
  state.status = null;
  state.isLoading = true;
};

const resetIsLoading = state => (state.isLoading = false);

const resetState = state => {
  state.isLoading = false;
  state.status = null;
  // {
  //   title: 'Ok',
  //   description: "It's good",
  //   status: 'success',
  // };
};

const fetchRj = (state, { payload }) => {
  state.status = {
    title: 'Download error.',
    description: payload,
    status: 'error',
  };
};

const anyRj = (state, { payload }) => {
  state.status = {
    title: 'Something is wrong ...',
    description: payload,
    status: 'error',
  };
};

const fetchFf = (state, { payload }) => {
  state.contactList = payload.data;
};

const addFf = (state, { payload }) => {
  state.contactList.push(payload);
};

const editFf = (state, { payload }) => {
  state.contactList = state.contactList.filter(
    ({ _id }) => _id !== payload._id
  );
  state.contactList.push(payload);
};

const delFf = (state, { payload }) => {
  state.contactList = state.contactList.filter(({ _id }) => _id !== payload);
};

const favFf = (state, { payload }) => {
  state.contactList = state.contactList.map(contact => {
    if (contact._id === payload._id) {
      contact.favorite = payload.favorite;
    }
    return contact;
  });
};

const resetContacts = state => {
  return initialState;
};

const initialState = {
  contactList: [],
  status: null,
  isLoading: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.rejected, fetchRj)
      .addCase(fetchContacts.fulfilled, fetchFf)
      .addCase(addContact.rejected, anyRj)
      .addCase(addContact.fulfilled, addFf)
      .addCase(editContact.rejected, anyRj)
      .addCase(editContact.fulfilled, editFf)
      .addCase(deleteContact.rejected, anyRj)
      .addCase(deleteContact.fulfilled, delFf)
      .addCase(favoriteContact.rejected, anyRj)
      .addCase(favoriteContact.fulfilled, favFf)
      .addCase(signOut.fulfilled, resetContacts)
      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('rejected')), resetIsLoading)
      .addMatcher(isAnyOf(...getActions('fulfilled')), resetState);
  },
});

export const contactsReducer = contactsSlice.reducer;
