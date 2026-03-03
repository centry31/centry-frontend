/**
 * FullCalendar month-like views that show day cells instead of time slots.
 */
export const isMonthLikeView = (viewType: string) => {
	return viewType === 'dayGridMonth' || viewType === 'multiMonth' || viewType === 'multiMonthYear';
};
