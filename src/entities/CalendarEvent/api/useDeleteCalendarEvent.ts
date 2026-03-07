import { axiosInstance, useApiMutation } from 'shared/api';

import type { DeleteCalendarEventScope } from '../model/types';

type Props = {
	eventId: string;
	spaceId: string;

	scope: DeleteCalendarEventScope;
	start: string;

	isNotifyMessage?: boolean;
	notifyMessage?: string;
};

export const useDeleteCalendarEvent = () => {
	const fetcher = async (props: Props) => {
		const { eventId, spaceId, scope, start, isNotifyMessage, notifyMessage } = props;
		await axiosInstance.delete(`/events/${spaceId}/${eventId}`, {
			params: {
				scope,
				start,
				isNotifyMessage,
				notifyMessage,
			},
		});
		return true;
	};

	return useApiMutation(fetcher);
};
