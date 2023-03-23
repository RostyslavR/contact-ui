import { instance } from '../instance';
import { createAsyncThunk } from '@reduxjs/toolkit';

// instance.defaults.baseURL = 'https://63b452b09f50390584ad81b3.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/api/contacts');
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await instance.post('/api/contacts', { ...contact });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (contact, thunkAPI) => {
    const { _id: contactId, ...rest } = contact;
    try {
      const {
        data: { data },
      } = await instance.put(`/api/contacts/${contactId}`, { ...rest });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const {
        data: {
          data: { _id },
        },
      } = await instance.delete(`/api/contacts/${contactId}`);
      return _id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const favoriteContact = createAsyncThunk(
  'contacts/favoriteContact',
  async ({ contactId, newFavorite }, thunkAPI) => {
    try {
      const {
        data: {
          data: { _id, favorite },
        },
      } = await instance.patch(`/api/contacts/${contactId}/favorite`, {
        favorite: newFavorite,
      });
      return { _id, favorite };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
