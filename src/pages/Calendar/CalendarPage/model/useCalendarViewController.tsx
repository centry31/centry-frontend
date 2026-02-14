import { useCallback, useMemo, useRef, useState } from 'react';
import type { DatesSetArg, DayHeaderContentArg, SlotLabelContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import type { DateClickArg } from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import type FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timeGrid';
import classNames from 'classnames';

import { getInitialDate, getInitialView, saveView, syncUrlParams } from 'shared/lib';

import { useIsMobile } from '../lib/useIsMobile';

export const useCalendarViewController = () => {
	const calendarRef = useRef<FullCalendar | null>(null);
	const [currentView, setCurrentView] = useState(getInitialView());
	const [currentDate, setCurrentDate] = useState(getInitialDate());
	const isMobile = useIsMobile();

	const calendarApi = useCallback(() => calendarRef.current?.getApi(), []);

	const handlePrev = useCallback(() => calendarApi()?.prev(), [calendarApi]);
	const handleNext = useCallback(() => calendarApi()?.next(), [calendarApi]);
	const handleToday = useCallback(() => calendarApi()?.today(), [calendarApi]);

	const handleChangeView = useCallback(
		(view: string) => {
			const api = calendarApi();
			api?.changeView(view);
			setCurrentView(view);
			saveView(view);
		},
		[calendarApi],
	);

	const handleDatesSet = useCallback((arg: DatesSetArg) => {
		setCurrentView(arg.view.type);
		setCurrentDate(arg.view.currentStart);
		syncUrlParams(arg.view.type, arg.view.currentStart);
	}, []);

	const handleDateClick = useCallback(
		(arg: DateClickArg) => {
			if (isMobile && arg.view.type === 'dayGridMonth') {
				calendarApi()?.changeView('timeGridDay', arg.date);
			}
		},
		[calendarApi, isMobile],
	);

	const dayHeaderContent = useCallback((arg: DayHeaderContentArg) => {
		const date: Date = arg.date;
		const isToday = date.toDateString() === new Date().toDateString();
		const dow = date.toLocaleDateString('ru', { weekday: 'short' });
		const day = date.toLocaleDateString('ru', { day: '2-digit' });
		const isMonthView = arg.view.type === 'dayGridMonth';

		return (
			<div className="dayhead">
				<span className="dow">{dow}</span>
				{!isMonthView && (
					<span className={classNames('day', isToday && 'is-today')}>{day}</span>
				)}
			</div>
		);
	}, []);

	const slotLabelContent = useCallback((arg: SlotLabelContentArg) => {
		const hours = String(arg.date.getHours()).padStart(2, '0');
		const minutes = String(arg.date.getMinutes()).padStart(2, '0');

		return (
			<div className="dayhead">
				<span className="dow">
					{hours}:{minutes}
				</span>
			</div>
		);
	}, []);

	const plugins = useMemo(
		() => [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
		[],
	);

	return {
		calendarRef,
		currentView,
		currentDate,
		plugins,

		onPrev: handlePrev,
		onNext: handleNext,
		onToday: handleToday,
		onChangeView: handleChangeView,
		onDatesSet: handleDatesSet,
		onDateClick: handleDateClick,
		dayHeaderContent,
		slotLabelContent,
	};
};
