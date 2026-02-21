import { normalizeEventDurationMinutes } from './getEventDurationFromStartAndEnd';

const MILLISECONDS_IN_MINUTE = 60_000;

/**
 * Returns ISO end date-time for a start date-time and duration in minutes.
 */
export const getEventEndFromStartAndDuration = (startISO: string, durationMinutes?: number) => {
	const startMs = new Date(startISO).getTime();
	if (Number.isNaN(startMs)) return startISO;

	const normalizedDurationMinutes = normalizeEventDurationMinutes(durationMinutes);
	return new Date(startMs + normalizedDurationMinutes * MILLISECONDS_IN_MINUTE).toISOString();
};
