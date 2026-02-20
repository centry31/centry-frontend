import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { CalendarEvent, CalendarEventFrequency, CalendarEventReminder } from '../model/types';

type Payload = {
	start: string;
	duration: number;

	title: string;
	description?: string;
	reminders: CalendarEventReminder[];

	frequency: CalendarEventFrequency;

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
