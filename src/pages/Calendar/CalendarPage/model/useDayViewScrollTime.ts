import type { MutableRefObject } from 'react';
import { useEffect, useMemo } from 'react';
import type { EventInput } from '@fullcalendar/core';
import type FullCalendar from '@fullcalendar/react';

import { DEFAULT_DAY_SCROLL_TIME, getDayStartScrollTime } from '../lib/dayViewScrollTime';

const DAY_VIEW = 'timeGridDay';

type Props = {
	calendarRef: MutableRefObject<FullCalendar | null>;
	currentView: string;
	currentDate: Date;
	events: EventInput[];
};

/**
 * Keeps timeGridDay aligned to the first event of the selected day.
 */
export const useDayViewScrollTime = (props: Props) => {
	const { calendarRef, currentView, currentDate, events } = props;

	const dayViewScrollTime = useMemo(() => {
		if (currentView !== DAY_VIEW) return DEFAULT_DAY_SCROLL_TIME;

		return getDayStartScrollTime(currentDate, events);
	}, [currentDate, currentView, events]);

	useEffect(() => {
		if (currentView !== DAY_VIEW) return;

		calendarRef.current?.getApi()?.scrollToTime(dayViewScrollTime);
	}, [calendarRef, currentView, dayViewScrollTime]);

	return dayViewScrollTime;
};
