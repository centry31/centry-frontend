import { useCallback } from 'react';
import type { EventContentArg } from '@fullcalendar/core';

import { isMonthLikeView } from '../lib/isMonthLikeView';

const LIST_VIEW = 'listWeek';
type EventClassNamesArg = {
	view: { type: string };
};

/**
 * Centralizes event rendering and styling rules for FullCalendar views.
 */
export const useCalendarEventPresentation = () => {
	const eventClassNames = useCallback((arg: EventClassNamesArg) => {
		const classes = ['us-event'];

		if (isMonthLikeView(arg.view.type)) {
			classes.push('us-event-month');
		}

		if (arg.view.type === LIST_VIEW) {
			classes.push('us-event-list');
		}

		return classes;
	}, []);

	const eventContent = useCallback((arg: EventContentArg) => {
		const monthLike = isMonthLikeView(arg.view.type);

		return (
			<div className="us-event-content">
				{!!arg.timeText && !monthLike && <span className="us-event-time">{arg.timeText}</span>}
				<span className="us-event-title">{arg.event.title}</span>
			</div>
		);
	}, []);

	return {
		eventClassNames,
		eventContent,
	};
};
