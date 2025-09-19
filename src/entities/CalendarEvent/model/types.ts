export type CalendarEventReminder = {
	offsetMinutes: number;
};

export type CalendarEvent = {
	id: string;

	start: string;
	end: string;

	title: string;
	description?: string;
	reminders: CalendarEventReminder[];
};

export type CreateCalendarEvent = Omit<CalendarEvent, 'id'>;
export type UpdateCalendarEvent = Omit<CalendarEvent, 'id'>;
