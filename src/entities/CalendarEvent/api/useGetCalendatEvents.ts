import useSWR from 'swr';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { CalendarEvent } from '../model/types';

/**
 * Запрашивает список всех календарных событий.
 *
 * @return data - список событий по конкретному пространству (выставляется через cookie).
 * */
export const useGetCalendarEvents = () => {
	const fetcher = () =>
		axiosInstance.get<ApiResponse<CalendarEvent[]>>('/events').then((res) => res.data.data);

	return useSWR('/api/events', fetcher);
};
