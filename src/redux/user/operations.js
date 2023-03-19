import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'http://localhost:3300/';
axios.defaults.baseURL = 'https://contact-server-002g.onrender.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const signUp = createAsyncThunk(
  'user/signup',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', credentials);

      setAuthHeader(res.data.token);
      const message = 'Account created.';

      return { ...res.data, message };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  'user/signin',
  async ({ rememberMe, sendMail, ...credentials }, thunkAPI) => {
    const params = {};
    sendMail && (params.sendmail = true);

    try {
      const res = await axios.post('/users/login', credentials, { params });

      setAuthHeader(res.data.token);

      const message = `Hello! ${res.data.user.name}`;
      return { ...res.data, rememberMe, message };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk('user/signuot', async (_, thunkAPI) => {
  try {
    await axios.get('/users/logout');
    const message = 'See you later';
    clearAuthHeader();
    return { message };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const remove = createAsyncThunk('user/remove', async (_, thunkAPI) => {
  try {
    await axios.delete('/users/remove');
    const message = 'User deleted';
    return { message };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteUnVerified = createAsyncThunk(
  'user/deleteUnVerified',
  async (_, thunkAPI) => {
    try {
      await axios.delete('/users/deleteUnVerified');
      const message = 'old unverified user deleted';
      return { message };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const rememberUser = createAsyncThunk(
  'user/remember',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.user.token;

    try {
      if (persistedToken === null) {
        throw new Error();
      }
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      const message = `Hello! ${res.data.name}`;
      return { user: res.data, message };
    } catch (error) {
      return thunkAPI.rejectWithValue('Authenticate please');
    }
  }
);

export const verify = createAsyncThunk('user/verify', async (val, thunkAPI) => {
  try {
    // await axios.get('/users/logout');
    const message = 'See you later';
    console.log(val);
    // clearAuthHeader();
    return { message };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
