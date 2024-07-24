import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {selectAuth} from '../redux/reducer';
import {User} from '../models/User';
import {IRootState} from '../redux/store';
import {configApi} from './configApi';
import {PermissionUser} from '../utils/jmix/model';
import {UserDevice} from '../models/UserDevice';

const APP_USER_URL = '/rest/app/user';

export const userApi = configApi.injectEndpoints({
  endpoints: builder => ({
    getPermission: builder.query<PermissionUser, void>({
      query: entity => ({
        url: `${APP_USER_URL}/permissions`,
      }),
    }),
    getUser: builder.query<User, string>({
      query: () => {
        const query = {
          url: APP_USER_URL,
        };
        return query;
      },
    }),
    updateUser: builder.mutation<User, any>({
      query: entity => ({
        url: `/update`,
        method: 'PUT',
        body: entity,
      }),
    }),
    updateDevice: builder.mutation<UserDevice, any>({
      query: entity => {
        const query = {
          url: `${APP_USER_URL}/device-token`,
          method: 'PUT',
          body: entity,
        };
        return query;
      },
    }),
    deleteDevice: builder.mutation<UserDevice, any>({
      query: entity => {
        const query = {
          url: `${APP_USER_URL}/device-token`,
          method: 'DELETE',
          body: entity,
        };
        return query;
      },
    }),
  }),
});
export const {
  useLazyGetUserQuery,
  useUpdateUserMutation,
  useLazyGetPermissionQuery,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
} = userApi;
