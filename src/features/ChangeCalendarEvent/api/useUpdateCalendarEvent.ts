import { useState } from 'react';

import type { CalendarEvent, UpdateCalendarEvent } from 'entities/CalendarEvent';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

type Payload = {
	eventId: string;
	event: UpdateCalendarEvent;
};

export const useUpdateCalendarEvent = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const request = async (payload: Payload) => {
		const { eventId, event } = payload;

		setIsLoading(true);
		setError('');

		try {
			const response = await axiosInstance.patch<ApiResponse<CalendarEvent>>(
				`/events/${eventId}`,
				event,
			);
			return response.data.data;
		} catch (error) {
			// TODO: add error handler (https://uniteam31.atlassian.net/browse/US-8)
			console.error(error);
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
