
import { createSlice } from '@reduxjs/toolkit';
import localForage from 'localforage';
import { loadFavoritesFromLocalForage } from '../favorites/favoritesSlice';
import {User} from "../../utils/Interfaces"
import { AppDispatch, RootState } from '../../app/store';

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')!)
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
    register: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      state.currentUser = null;
    },
  },
});

export const registerUser = (userData:User) => async (dispatch:AppDispatch) => {
  const registeredUsers:User[] = (await localForage.getItem("RegisteredUsers")) || [];
  registeredUsers.push(userData);
  await localForage.setItem("RegisteredUsers", registeredUsers);
  dispatch(register(userData));
};

export const authenticateUser = (data:User) => async (dispatch:any) => {
  const registeredUsers:User[] = (await localForage.getItem("RegisteredUsers")) || [];
  const user = registeredUsers.find(user => user.username === data.username && user.password === data.password);
  if (user) {
    dispatch(userSlice.actions.login(user));
    dispatch(loadFavoritesFromLocalForage(user.username));
  } else {
    alert("Invalid Credentials"); 
  }
};

export const { login, logout, register } = userSlice.actions;

export const selectUser = (state:RootState) => state.user.currentUser;

export default userSlice.reducer;
  





