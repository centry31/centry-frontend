import useSWR from 'swr';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { CalendarEvent } from '../model/types';

type Props = {
	spaceId: string;
	start: Date;
	end: Date;
};

/**
 * Запрашивает список всех календарных событий.
 *
 * @return data - список событий по конкретному пространству (выставляется через cookie).
 * */
export const useGetCalendarEvents = (props: Props) => {
	const { spaceId, start, end } = props;

	const fetcher = () =>
		axiosInstance
			.get<
				ApiResponse<CalendarEvent[]>
			>(`/events/${spaceId}`, { params: { from: start, to: end } })
			.then((res) => res.data.data);

	return useSWR(`/api/events/${spaceId}/${start}-${end}`, fetcher);
};
