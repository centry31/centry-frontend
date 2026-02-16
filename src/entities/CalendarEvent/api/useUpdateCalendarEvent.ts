import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { CalendarEvent, CalendarEventReminder } from '../model/types';

type Props = {
	id: string;

	start: string;
	end: string;

	title: string;
	description?: string;
	reminders: CalendarEventReminder[];
};

export const useUpdateCalendarEvent = () => {
	const fetcher = async (props: Props) => {
		const { id, ...payload } = props;
		const response = await axiosInstance.patch<ApiResponse<CalendarEvent>>(
			`/events/${id}`,
			payload,
		);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
