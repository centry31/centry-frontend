import { axiosInstance, useApiMutation } from 'shared/api';

import type { DeleteCalendarEventScope } from '../model/types';

type Props = {
	eventId: string;
	spaceId: string;

	scope: DeleteCalendarEventScope;
	start: string;
};

export const useDeleteCalendarEvent = () => {
	const fetcher = async (props: Props) => {
		const { eventId, spaceId, scope, start } = props;
		await axiosInstance.delete(`/events/${spaceId}/${eventId}`, {
			params: {
				scope,
				start,
			},
		});
		return true;
	};

	return useApiMutation(fetcher);
};
