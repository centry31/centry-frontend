import type { MutableRefObject, ReactNode } from 'react';
import type {
	DateSelectArg,
	DatesSetArg,
	DayHeaderContentArg,
	EventChangeArg,
	EventClickArg,
	EventInput,
	PluginDef,
	SlotLabelContentArg,
} from '@fullcalendar/core';
import ruLocale from '@fullcalendar/core/locales/ru';
import type { DateClickArg } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { Card, CardBody } from '@heroui/react';

import { DEFAULT_SLOT_DURATION, DEFAULT_SLOT_MAX_TIME, SELECT_LONG_PRESS_DELAY_MS } from '../lib/calendar.constants';
import { useCalendarEventPresentation } from '../model/useCalendarEventPresentation';

type Props = {
	calendarRef: MutableRefObject<FullCalendar | null>;
	currentView: string;
	currentDate: Date;
	plugins: PluginDef[];
	events: EventInput[];
	isEditable: boolean;
	dayMaxEventRows: number;
	dayViewScrollTime: string;

	onDatesSet: (arg: DatesSetArg) => void;
	onSelectSlot: (arg: DateSelectArg) => void;
	onChangeEvent: (arg: EventChangeArg) => void;
	onClickEvent: (arg: EventClickArg) => void;
	onDateClick: (arg: DateClickArg) => void;

	dayHeaderContent: (arg: DayHeaderContentArg) => ReactNode;
	slotLabelContent: (arg: SlotLabelContentArg) => ReactNode;
};

export const CalendarBoard = (props: Props) => {
	const {
		calendarRef,
		currentView,
		currentDate,
		plugins,
		events,
		isEditable,
		dayMaxEventRows,
		dayViewScrollTime,
		onDatesSet,
		onSelectSlot,
		onChangeEvent,
		onClickEvent,
		onDateClick,
		dayHeaderContent,
		slotLabelContent,
	} = props;

	const { eventClassNames, eventContent } = useCalendarEventPresentation();

	return (
		<Card
			shadow="none"
			className="calendar-shell flex h-full flex-1 border border-white/70 bg-white/88"
		>
			<CardBody className="calendar-shell__body h-full p-2 sm:p-3">
				<FullCalendar
					ref={calendarRef}
					initialView={currentView}
					initialDate={currentDate}
					datesSet={onDatesSet}
					events={events}
					plugins={plugins}
					// locale and view
					locale={ruLocale}
					firstDay={1}
					dayMaxEventRows={dayMaxEventRows}
					multiMonthMaxColumns={1}
					moreLinkText="ещё"
					// interaction
					selectLongPressDelay={SELECT_LONG_PRESS_DELAY_MS}
					editable={isEditable}
					selectable={isEditable}
					allDaySlot={false}
					selectMirror={true}
					// time grid
					scrollTime={dayViewScrollTime}
					slotDuration={DEFAULT_SLOT_DURATION}
					slotMaxTime={DEFAULT_SLOT_MAX_TIME}
					nowIndicator={true}
					// layout
					expandRows={true}
					stickyHeaderDates={true}
					headerToolbar={false}
					height="100%"
					themeSystem="standard"
					// rendering
					eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
					slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
					eventClassNames={eventClassNames}
					eventContent={eventContent}
					dayHeaderContent={dayHeaderContent}
					slotLabelContent={slotLabelContent}
					// handlers
					select={onSelectSlot}
					eventDrop={onChangeEvent}
					eventResize={onChangeEvent}
					eventClick={onClickEvent}
					dateClick={onDateClick}
				/>
			</CardBody>
		</Card>
	);
};
