import useSWR from 'swr';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

/**
 * Запрашивает список всех календарных событий.
 *
 * @return data - список событий по конкретному пространству (выставляется через cookie).
 * */
export const useGetCalendarEvents = () => {
	const fetcher = () =>
		axiosInstance.get<ApiResponse<Event[]>>('/events').then((res) => res.data.data);

	const { data, mutate, isLoading, error } = useSWR('/api/events', fetcher);

	return {
		data,
		mutate,
		isLoading,
		error,
	};
};
