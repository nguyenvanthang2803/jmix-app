import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './reducer';
import {Auth} from '../services/authService';
import {setupListeners} from '@reduxjs/toolkit/query';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configApi} from '../services/configApi';
const store = configureStore({
  reducer: {
    [Auth.reducerPath]: Auth.reducer,
    auth: authReducer,
    [configApi.reducerPath]: configApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(Auth.middleware, configApi.middleware),
});
setupListeners(store.dispatch);
export default store;

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
