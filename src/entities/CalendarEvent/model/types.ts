type CalendarEventReminder = {
	offsetMinutes: number;
};
type CalendarEventFrequency = 'NEVER' | 'DAILY' | 'WEEKLY' | 'DOUBLE_WEEKLY' | 'MONTHLY';

type CalendarEvent = {
	id: string;
	orderIndex: number;

	start: string;
	duration: number;

	title: string;
	description?: string;

	reminders: CalendarEventReminder[];
	frequency: CalendarEventFrequency;
};

type CreateCalendarEvent = {
	start: string;
	end: string;

	title: string;
	description?: string;

	reminders: CalendarEventReminder[];
	frequency: CalendarEventFrequency;

	isNotifyMessage?: boolean;
	notifyMessage?: string;
};

type UpdateCalendarEventType = 'ONE' | 'FUTURE';
type UpdateCalendarEvent = {
	start: string;
	end: string;

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
	UpdateCalendarEvent,
	UpdateCalendarEventType,
};
