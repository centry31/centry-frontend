import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { CalendarEvent, CalendarEventScope } from '../model/types';

type Props = {
	eventId: string;
	spaceId: string;

	scope?: CalendarEventScope;
	occurrenceStart?: string;
};

export const useDeleteCalendarEvent = () => {
	const fetcher = async (props: Props) => {
		const { eventId, spaceId, scope, occurrenceStart } = props;
		const response = await axiosInstance.delete<ApiResponse<CalendarEvent>>(
			`/events/${spaceId}/${eventId}`,
			{
				params: {
					scope,
					occurrenceStart,
				},
			},
		);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
