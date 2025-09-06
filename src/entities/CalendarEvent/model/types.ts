export type CalendarEvent = {
	id: string;

	start: string;
	end: string;

	title: string;
	description?: string;
};

export type CreateCalendarEvent = Omit<CalendarEvent, 'id'>;
