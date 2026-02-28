type CalendarEventReminder = { offsetMinutes: number };
type CalendarEventFrequency = 'NEVER' | 'DAILY' | 'WEEKLY' | 'DOUBLE_WEEKLY' | 'MONTHLY';

type CalendarEvent = {
	id: string;

	start: string;
	duration: number;
	timeZone: string;

	frequency: CalendarEventFrequency;
	until?: string;

	title: string;
	description?: string | null;

	reminders: CalendarEventReminder[];
};

type CreateCalendarEvent = {
	start: string;
	end: string;
	timeZone: string;

	frequency: CalendarEventFrequency;
	until?: string;

	title: string;
	description?: string | null;

	reminders: CalendarEventReminder[];

	isNotifyMessage?: boolean;
	notifyMessage?: string;
};

type CreateUpdateCalendarEventScope = 'THIS' | 'THIS_AND_FUTURE';
type DeleteCalendarEventScope = 'THIS' | 'SERIES';

type FrequencySelectItem = {
	key: CalendarEventFrequency;
	label: string;
};
type UpdateCalendarEvent = {
	start: string;
	end: string;
	timeZone: string;

	frequency: CalendarEventFrequency;
	until?: string;

	title: string;
	description?: string | null;

	reminders: CalendarEventReminder[];
};

export {
	CalendarEvent,
	CalendarEventFrequency,
	CalendarEventReminder,
	CreateCalendarEvent,
	CreateUpdateCalendarEventScope,
	DeleteCalendarEventScope,
	FrequencySelectItem,
	UpdateCalendarEvent,
};
