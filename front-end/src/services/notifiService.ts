import {configApi} from './configApi';
const APP_NOTIFI_URL = '/rest/app/notice';
export const notifiApi = configApi.injectEndpoints({
  endpoints: builder => ({
    getNumOfNotice: builder.query<void, void>({
      query: () => `${APP_NOTIFI_URL}/count`,
    }),
    getNoticeAll: builder.query<void, void>({
      query: ({currentOffset}) => {
        const query = {
          url: `${APP_NOTIFI_URL}/getlist?limit=50&offset=${currentOffset}`,
        };
        return query;
      },
    }),
  }),
});
export const {useGetNumOfNoticeQuery, useGetNoticeAllQuery} = notifiApi;
