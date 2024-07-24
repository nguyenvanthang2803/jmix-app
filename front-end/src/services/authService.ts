import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {ResponeLogin} from '../respone/ResponeLogin';
export const baseQueryAuth = fetchBaseQuery({
  // base url of backend API
  baseUrl: 'http://10.15.169.43:8080/realms/portal',
  // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
  prepareHeaders: headers => {
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  },
});

export const Auth = createApi({
  reducerPath: 'storageToken',
  baseQuery: baseQueryAuth,
  endpoints: builder => ({
    getToken: builder.mutation({
      query: data => ({
        url: '/protocol/openid-connect/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: data => ({
        url: '/protocol/openid-connect/logout',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      }),
    }),
  }),
});
export const {useGetTokenMutation, useLogoutMutation} = Auth;
