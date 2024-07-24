import {ItemTaskType} from '../models/ItemTask';
import {configApi} from './configApi';
const APP_TASK_URL = '/rest/app/task';
const taskApi = configApi.injectEndpoints({
  endpoints: builder => ({
    createTask: builder.query<void, void>({
      query: () => ({
        url: `${APP_TASK_URL}/create`,
      }),
      // Pick out errors and prevent nested properties in a hook or selector
    }),
    loadListTask: builder.query<ItemTaskType[], any>({
      query: ({currentOffset}) => {
        const query = {
          url: `${APP_TASK_URL}/getlist?limit=6&offset=${currentOffset}`,
        };
        return query;
      },
    }),
    updateTask: builder.mutation({
      query: data => ({
        url: `${APP_TASK_URL}/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteTask: builder.mutation({
      query: id => ({
        url: `${APP_TASK_URL}/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    submitTask: builder.mutation({
      query: data => ({
        url: `${APP_TASK_URL}/submit/${data.id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    loadManager: builder.query<void, void>({
      query: () => ({
        url: `${APP_TASK_URL}/manager`,
      }),
    }),
  }),
});

export const {
  useLazyCreateTaskQuery,
  useLoadListTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useLoadManagerQuery,
} = taskApi;
