import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type {
	CalendarEvent,
	CalendarEventRecurrence,
	CalendarEventReminder,
	CalendarEventScope,
} from '../model/types';

type Props = {
	eventId: string;
	spaceId: string;

	scope: CalendarEventScope;
	occurrenceStart?: string;

	start: string;
	duration: number;
	timeZone: string;
	recurrence: CalendarEventRecurrence;

	title: string;
	description?: string | null;

	reminders: CalendarEventReminder[];
};

export const useUpdateCalendarEvent = () => {
	const fetcher = async (props: Props) => {
		const { eventId, spaceId, ...payload } = props;
		const response = await axiosInstance.patch<ApiResponse<CalendarEvent>>(
			`/events/${spaceId}/${eventId}`,
			payload,
		);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
