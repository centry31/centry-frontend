const MILLISECONDS_IN_MINUTE = 60_000;
const DEFAULT_EVENT_DURATION_MINUTES = 60;
const MIN_EVENT_DURATION_MINUTES = 1;

const normalizeFiniteMinutes = (minutes: number) => {
	if (!Number.isFinite(minutes)) return DEFAULT_EVENT_DURATION_MINUTES;
	return Math.max(MIN_EVENT_DURATION_MINUTES, Math.round(minutes));
};

/**
 * Normalizes duration (minutes) with lower bound and default fallback.
 */
export const normalizeEventDurationMinutes = (
	durationMinutes?: number,
	fallbackMinutes = DEFAULT_EVENT_DURATION_MINUTES,
) => {
	if (typeof durationMinutes !== 'number') {
		return normalizeFiniteMinutes(fallbackMinutes);
	}

	return normalizeFiniteMinutes(durationMinutes);
};

/**
 * Calculates duration in minutes from start/end ISO values.
 */
export const getEventDurationFromStartAndEnd = (
	startISO?: string | null,
	endISO?: string | null,
	fallbackMinutes = DEFAULT_EVENT_DURATION_MINUTES,
) => {
	if (!startISO || !endISO) {
		return normalizeEventDurationMinutes(undefined, fallbackMinutes);
	}

	const startMs = new Date(startISO).getTime();
	const endMs = new Date(endISO).getTime();

	if (Number.isNaN(startMs) || Number.isNaN(endMs)) {
		return normalizeEventDurationMinutes(undefined, fallbackMinutes);
	}

	const durationMinutes = (endMs - startMs) / MILLISECONDS_IN_MINUTE;
	return normalizeEventDurationMinutes(durationMinutes, fallbackMinutes);
};
