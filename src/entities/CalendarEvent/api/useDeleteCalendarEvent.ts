import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { CalendarEvent } from '../model/types';

type Props = {
	eventId: string;
};

export const useDeleteCalendarEvent = () => {
	const fetcher = async (props: Props) => {
		const { eventId } = props;
		const response = await axiosInstance.delete<ApiResponse<CalendarEvent>>(
			`/events/${eventId}`,
		);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
