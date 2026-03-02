import { axiosInstance, useApiMutation } from 'shared/api';

import type {
	CalendarEventFrequency,
	CalendarEventReminder,
	CreateUpdateCalendarEventScope,
} from '../model/types';

type Props = {
	eventId: string;
	spaceId: string;

	scope: CreateUpdateCalendarEventScope;

	newStart: string;
	oldStart: string;

	duration: number;
	timeZone: string;

	frequency: CalendarEventFrequency;
	until?: string;

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
