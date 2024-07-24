import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Auth} from '../services/authService';
import {User} from '../models/User';
import {ItemTaskType} from '../models/ItemTask';
import {PermissionUser} from '../utils/jmix/model';
import {userApi} from '../services/userService';
interface StateInitial {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  permission: PermissionUser | null;
  user: User | null;
  listTask: ItemTaskType[];
}
const initialState: StateInitial = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null as User | null,
  permission: null,
  listTask: [],
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{user: User}>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<{user: User}>) => {
      state.user = action.payload.user;
    },
    addListTask: (state, action: PayloadAction<{task: ItemTaskType}>) => {
      state.listTask.push(action.payload.task);
    },
    setToken: (state, action) => {
      state.accessToken = action.payload.data.access_token;
      state.refreshToken = action.payload.data.refresh_token;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      Auth.endpoints.getToken.matchFulfilled,
      (state, action) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
      },
    );
    builder.addMatcher(
      userApi.endpoints.getPermission.matchFulfilled,
      (state, action) => {
        state.permission = action.payload;
      },
    );
  },
});
export const {login, logout} = authSlice.actions;
export const selectAuth = (state: {auth: any}) => state.auth;
export default authSlice.reducer;
