import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { CalendarEvent, CalendarEventReminder } from '../model/types';

type Payload = {
	start: string;
	end: string;

	title: string;
	description?: string;
	reminders: CalendarEventReminder[];

	isNotifyMessage?: boolean;
	notifyMessage?: string;
};

/**
 * Создает календарное событие в конкретном пространстве.
 * Пространство выставляется с каждым запросом через cookie.
 * */
export const useCreateCalendarEvent = () => {
	const fetcher = async (payload: Payload) => {
		const response = await axiosInstance.post<ApiResponse<CalendarEvent>>('/events', payload);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
