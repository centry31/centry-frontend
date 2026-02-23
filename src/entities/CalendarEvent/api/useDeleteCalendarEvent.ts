import { axiosInstance, useApiMutation } from 'shared/api';

import type { CalendarEventScope } from '../model/types';

type Props = {
	eventId: string;
	spaceId: string;

	scope?: CalendarEventScope;
	occurrenceStart?: string;
};

export const useDeleteCalendarEvent = () => {
	const fetcher = async (props: Props) => {
		const { eventId, spaceId, scope, occurrenceStart } = props;
		await axiosInstance.delete(`/events/${spaceId}/${eventId}`, {
			params: {
				scope,
				occurrenceStart,
			},
		});
		return true;
	};

	return useApiMutation(fetcher);
};
