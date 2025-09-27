import { useState } from 'react';

import type { CalendarEvent, CreateCalendarEvent } from 'entities/CalendarEvent';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

type Props = {
	event: CreateCalendarEvent;
};

/**
 * Создает календарное событие в конкретном пространстве.
 * Пространство выставляется с каждым запросом через cookie.
 * */
export const useCreateCalendarEvent = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const request = async (props: Props) => {
		const { event } = props;

		setIsLoading(true);
		setError('');

		try {
			const response = await axiosInstance.post<ApiResponse<CalendarEvent>>('/events', event);
			return response.data.data;
		} catch (error) {
			// TODO: add error handler (https://uniteam31.atlassian.net/browse/US-8)
			console.error({ error });
		} finally {
			setIsLoading(false);
		}
	};

	return {
		request,
		isLoading,
		error,
	};
};
