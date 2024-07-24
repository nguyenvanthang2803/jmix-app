import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {IRootState} from '../redux/store';
import {selectAuth} from '../redux/reducer';
import {baseQueryAuth} from './authService';
import {encodeFormData} from '../utils/auth-utils';
const baseQuery = fetchBaseQuery({
  // base url of backend API
  baseUrl: 'http://10.15.169.43:8083',
  // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
  prepareHeaders: (headers, {getState}) => {
    const authState = selectAuth(getState() as IRootState);
    if (authState && authState.accessToken) {
      headers.set('Authorization', `Bearer ${authState.accessToken}`);
    }
    return headers;
  },
});
const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status == 401) {
    const {refreshToken} = selectAuth(api.getState() as IRootState);
    const formRefresh = {
      refresh_token: refreshToken,
      client_id: 'portal-app',
      grant_type: 'refresh_token',
      client_secret: '2GrwBZHfQHF6qk6v0h1fKGHpS3SXcBeC',
    };
    const refreshResult = await baseQueryAuth(
      {
        url: '/protocol/openid-connect/token',
        method: 'POST',
        body: encodeFormData(formRefresh),
      },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      // store the new token
      api.dispatch({
        type: 'auth/setToken',
        payload: {data: refreshResult.data},
      });
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({type: 'auth/logout'});
    }
  }
  return result;
};

export const configApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
