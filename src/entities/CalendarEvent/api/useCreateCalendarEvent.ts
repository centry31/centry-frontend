import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { CalendarEvent, CalendarEventFrequency, CalendarEventReminder } from '../model/types';

type Props = {
	spaceId: string;

	start: string;
	duration: number;
	timeZone: string;

	frequency: CalendarEventFrequency;
	until?: string;

	title: string;
	description?: string | null;
	reminders: CalendarEventReminder[];

	isNotifyMessage?: boolean;
	notifyMessage?: string;
};

/**
 * Создает календарное событие в конкретном пространстве.
 * Пространство выставляется с каждым запросом через cookie.
 * */
export const useCreateCalendarEvent = () => {
	const fetcher = async (props: Props) => {
		const { spaceId, ...payload } = props;
		const response = await axiosInstance.post<ApiResponse<CalendarEvent>>(
			`/events/${spaceId}`,
			payload,
		);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
