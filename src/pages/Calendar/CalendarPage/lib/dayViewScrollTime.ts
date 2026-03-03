import type { EventInput } from '@fullcalendar/core';

export const DEFAULT_DAY_SCROLL_TIME = '09:00:00';
const TIME_GRID_SLOT_MINUTES = 30;

const parseEventDate = (value: EventInput['start']) => {
	if (value === undefined || value === null) return null;

	if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;

	if (Array.isArray(value)) {
		const [year, month = 0, day = 1, hours = 0, minutes = 0, seconds = 0] = value;
		const parsedDate = new Date(year, month, day, hours, minutes, seconds);
		return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
	}

	const parsedDate = new Date(value);
	if (Number.isNaN(parsedDate.getTime())) return null;

	return parsedDate;
};

/**
 * Returns the time to which day view should auto-scroll.
 * If there are events on the selected day, uses the earliest event (rounded down to slot size).
 * Otherwise falls back to default start time.
 */
export const getDayStartScrollTime = (currentDate: Date, calendarEvents: EventInput[]) => {
	const currentDayKey = currentDate.toDateString();
	let firstEventMinutes: number | null = null;

	for (const calendarEvent of calendarEvents) {
		const eventStartDate = parseEventDate(calendarEvent.start);
		if (!eventStartDate) continue;
		if (eventStartDate.toDateString() !== currentDayKey) continue;

		const eventMinutes = eventStartDate.getHours() * 60 + eventStartDate.getMinutes();

		if (firstEventMinutes === null || eventMinutes < firstEventMinutes) {
			firstEventMinutes = eventMinutes;
		}
	}

	if (firstEventMinutes === null) return DEFAULT_DAY_SCROLL_TIME;

	const roundedMinutes =
		Math.floor(firstEventMinutes / TIME_GRID_SLOT_MINUTES) * TIME_GRID_SLOT_MINUTES;
	const hours = String(Math.floor(roundedMinutes / 60)).padStart(2, '0');
	const minutes = String(roundedMinutes % 60).padStart(2, '0');

	return `${hours}:${minutes}:00`;
};
