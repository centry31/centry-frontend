type CalendarEventReminder = {
	offsetMinutes: number;
};
type CalendarEventRecurrenceType =
	| 'NONE'
	| 'DAILY'
	| 'WEEKLY'
	| 'DOUBLE_WEEKLY'
	| 'MONTHLY';

type CalendarEventRecurrence = {
	type: CalendarEventRecurrenceType;
	until?: string;
};

type CalendarEvent = {
	eventId: string;
	occurrenceStart: string;

	start: string;
	duration: number;
	timeZone: string;
	recurrence: CalendarEventRecurrence;

	title: string;
	description?: string | null;

	reminders: CalendarEventReminder[];
};

type CreateCalendarEvent = {
	start: string;
	end: string;
	timeZone: string;
	recurrence: CalendarEventRecurrence;

	title: string;
	description?: string | null;

	reminders: CalendarEventReminder[];

	isNotifyMessage?: boolean;
	notifyMessage?: string;
};

type CalendarEventScope = 'SERIES' | 'THIS' | 'THIS_AND_FUTURE';

type RecurrenceSelectItem = {
	key: CalendarEventRecurrenceType;
	label: string;
};
type UpdateCalendarEvent = {
	start: string;
	end: string;
	timeZone: string;
	recurrence: CalendarEventRecurrence;

	title: string;
	description?: string | null;

	reminders: CalendarEventReminder[];
};

export {
	CalendarEvent,
	CalendarEventRecurrence,
	CalendarEventRecurrenceType,
	CalendarEventReminder,
	CalendarEventScope,
	CreateCalendarEvent,
	RecurrenceSelectItem,
	UpdateCalendarEvent,
};
