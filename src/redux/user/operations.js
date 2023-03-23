import { instance, setToken } from '../instance';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signUp = createAsyncThunk(
  'user/signup',
  async (credentials, thunkAPI) => {
    try {
      const res = await instance.post('/users/signup', credentials);

      setToken(res.data.token);
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
      const res = await instance.post('/users/login', credentials, { params });

      setToken(res.data.token);

      const message = `Hello! ${res.data.user.name}`;
      return { ...res.data, rememberMe, message };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk('user/signuot', async (_, thunkAPI) => {
  try {
    await instance.get('/users/logout');
    const message = 'See you later';
    setToken();
    return { message };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const remove = createAsyncThunk('user/remove', async (_, thunkAPI) => {
  try {
    await instance.delete('/users/remove');
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
      await instance.delete('/users/deleteUnVerified');
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
      setToken(persistedToken);
      const res = await instance.get('/users/current');
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
    // setToken();
    return { message };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
