import { axiosInstance, useApiMutation } from 'shared/api';

import type {
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
		await axiosInstance.patch(`/events/${spaceId}/${eventId}`, payload);
		return true;
	};

	return useApiMutation(fetcher);
};
