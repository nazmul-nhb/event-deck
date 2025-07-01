import { baseApi } from '@/app/api/baseApi';
import type { IQueryParams } from '@/types';
import type { IEvent, IEventResponse, TEventData } from '@/types/event.types';
import type { IServerResponse } from '@/types/server.types';
import { generateQueryParams } from 'nhb-toolbox';

export const eventApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createEvent: builder.mutation<IServerResponse<IEvent>, TEventData>({
			query: (data) => ({
				url: 'events',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Events'],
		}),

		getAllEvents: builder.query<IServerResponse<IEventResponse>, IQueryParams<IEvent>>({
			query: (queryObject) => {
				const queryParams = generateQueryParams(queryObject);

				return {
					url: `events`.concat(queryParams),
					method: 'GET',
				};
			},
			providesTags: ['Events'],
		}),

		getUserEvents: builder.query<IServerResponse<IEvent>, void>({
			query: () => ({
				url: `events/user`,
				method: 'GET',
			}),
			providesTags: ['Events'],
		}),

		deleteEvent: builder.mutation<IServerResponse<void>, string>({
			query: (id) => ({
				url: `events/`.concat(id),
				method: 'DELETE',
			}),
			invalidatesTags: (_r, _e, id) => [{ id, type: 'Event' }, { type: 'Events' }],
		}),

		updateEvent: builder.mutation<
			IServerResponse<void>,
			{ id: string; data: Partial<TEventData> }
		>({
			query: ({ id, data }) => ({
				url: `events/`.concat(id),
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: (_r, _e, { id }) => [
				{ id, type: 'Event' },
				{ type: 'Events' },
			],
		}),

		joinEvent: builder.mutation<IServerResponse<void>, string>({
			query: (id) => ({
				url: `events/join/`.concat(id),
				method: 'PATCH',
			}),
			invalidatesTags: (_r, _e, id) => [{ id, type: 'Event' }, { type: 'Events' }],
		}),
	}),
	overrideExisting: false,
});

export const {
	useCreateEventMutation,
	useGetUserEventsQuery,
	useGetAllEventsQuery,
	useDeleteEventMutation,
	useUpdateEventMutation,
} = eventApi;
