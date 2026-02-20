import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type {
	CalendarEvent,
	CalendarEventFrequency,
	CalendarEventReminder,
	UpdateCalendarEventType,
} from '../model/types';

type Props = {
	id: string;
	orderIndex: number;

	start: string;
	originalStart?: string;
	duration: number;

	title: string;
	description?: string;

	reminders: CalendarEventReminder[];
	frequency: CalendarEventFrequency;

	updateType: UpdateCalendarEventType;
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
