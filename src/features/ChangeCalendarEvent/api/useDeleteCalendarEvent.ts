import { useState } from 'react';

import type { CalendarEvent } from 'entities/CalendarEvent';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

type Props = {
	eventId: string;
};

export const useDeleteCalendarEvent = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const request = async (Props: Props) => {
		const { eventId } = Props;

		setIsLoading(true);
		setError('');

		try {
			const response = await axiosInstance.delete<ApiResponse<CalendarEvent>>(
				`/events/${eventId}`,
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
