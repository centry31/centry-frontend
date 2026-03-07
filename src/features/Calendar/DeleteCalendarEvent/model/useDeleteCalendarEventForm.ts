import { useCallback } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useCalendarViewStore } from 'entities/Calendar';
import type {
	CalendarEventFrequency,
	DeleteCalendarEvent,
	DeleteCalendarEventScope,
} from 'entities/CalendarEvent';
import { useDeleteCalendarEvent, useGetCalendarEvents } from 'entities/CalendarEvent';
import { useGetSpace } from 'entities/Space';

import { notifySuccess } from 'shared/lib';

type Props = {
	eventId: string;
	eventFrequency: CalendarEventFrequency;
	eventStart: string;

	onSuccess?: () => void;
};

export const useDeleteCalendarEventForm = (props: Props) => {
	const { eventId, eventFrequency, eventStart, onSuccess } = props;

	const { spaceId = '' } = useParams();
	const { currentDate } = useCalendarViewStore();

	const { data: currentSpace } = useGetSpace({ spaceId });
	const { mutate: mutateCalendarEvents } = useGetCalendarEvents({
		spaceId,
		start: currentDate.start,
		end: currentDate.end,
	});
	const { request: deleteCalendarEvent, isLoading: isDeleting } = useDeleteCalendarEvent();

	const { control } = useForm<DeleteCalendarEvent>();

	const {
		field: { value: isNotifyMessage, onChange: onToggleIsNotifyMessage },
	} = useController({ control, name: 'isNotifyMessage' });
	const {
		field: { value: notifyMessage, onChange: onChangeNotifyMessage },
	} = useController({ control, name: 'notifyMessage' });

	const handleToggleIsNotifyMessage = useCallback(() => {
		onToggleIsNotifyMessage(!isNotifyMessage);
	}, [onToggleIsNotifyMessage, isNotifyMessage]);

	const handleChangeNotifyMessage = useCallback(
		(message: string) => {
			onChangeNotifyMessage(message);
		},
		[onChangeNotifyMessage],
	);

	const handleDeleteCalendarEvent = useCallback(
		async (scope: DeleteCalendarEventScope) => {
			const actualScope = eventFrequency === 'NEVER' ? 'THIS' : scope;

			const result = await deleteCalendarEvent({
				spaceId,
				eventId,
				scope: actualScope,
				start: eventStart,
				isNotifyMessage,
				notifyMessage,
			});
			if (result === undefined) return;

			mutateCalendarEvents();
			notifySuccess('Событие удалено');
			onSuccess?.();
		},
		[
			eventFrequency,
			deleteCalendarEvent,
			spaceId,
			eventId,
			eventStart,
			mutateCalendarEvents,
			onSuccess,
		],
	);

	return {
		isSpaceHasTelegramChats: Boolean(currentSpace?.hasTelegramChats),

		isNotifyMessage,
		onToggleIsNotifyMessage: handleToggleIsNotifyMessage,

		notifyMessage,
		onChangeNotifyMessage: handleChangeNotifyMessage,

		isDeleting,
		onDeleteCalendarEvent: handleDeleteCalendarEvent,
	};
};
