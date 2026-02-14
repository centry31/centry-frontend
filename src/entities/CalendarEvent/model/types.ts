type CalendarEventReminder = {
	offsetMinutes: number;
};

type CalendarEvent = {
	id: string;

	start: string;
	end: string;

	title: string;
	description?: string;
	reminders: CalendarEventReminder[];
};

type CreateCalendarEvent = {
	start: string;
	end: string;

	title: string;
	description?: string;
	reminders: CalendarEventReminder[];
};

type UpdateCalendarEvent = {
	start: string;
	end: string;

	title: string;
	description?: string;
	reminders: CalendarEventReminder[];
};

export { CalendarEvent, CalendarEventReminder, CreateCalendarEvent, UpdateCalendarEvent };
