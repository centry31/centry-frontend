type CalendarEventReminder = {
	offsetMinutes: number;
};
type CalendarEventFrequency = 'NEVER' | 'DAILY' | 'WEEKLY' | 'DOUBLE_WEEKLY' | 'MONTHLY';

type CalendarEvent = {
	id: string;
	orderIndex: number;

	start: string;
	duration: number;
	repeatUntil?: string;

	title: string;
	description?: string;

	reminders: CalendarEventReminder[];
	frequency: CalendarEventFrequency;
};

type CreateCalendarEvent = {
	start: string;
	end: string;
	repeatUntil?: string;

	title: string;
	description?: string;

	reminders: CalendarEventReminder[];
	frequency: CalendarEventFrequency;

	isNotifyMessage?: boolean;
	notifyMessage?: string;
};

type UpdateCalendarEventType = 'ONE' | 'FUTURE';
type FrequencySelectItem = {
	key: CalendarEventFrequency;
	label: string;
};
type UpdateCalendarEvent = {
	start: string;
	end: string;
	repeatUntil?: string;

	title: string;
	description?: string;

	reminders: CalendarEventReminder[];
	frequency: CalendarEventFrequency;
};

export {
	CalendarEvent,
	CalendarEventFrequency,
	CalendarEventReminder,
	CreateCalendarEvent,
	FrequencySelectItem,
	UpdateCalendarEvent,
	UpdateCalendarEventType,
};
