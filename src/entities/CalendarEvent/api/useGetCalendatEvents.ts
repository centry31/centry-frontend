import useSWR from 'swr';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { CalendarEvent } from '../model/types';

type Props = {
	start: Date;
	end: Date;
};

/**
 * Запрашивает список всех календарных событий.
 *
 * @return data - список событий по конкретному пространству (выставляется через cookie).
 * */
export const useGetCalendarEvents = (props: Props) => {
	const { start, end } = props;

	const fetcher = () =>
		axiosInstance
			.get<ApiResponse<CalendarEvent[]>>('/events', { params: { from: start, to: end } })
			.then((res) => res.data.data);

	return useSWR(`/api/events/${start}-${end}`, fetcher);
};
