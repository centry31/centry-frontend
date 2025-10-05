export const formatDateRange = (startISO: string, endISO: string, locale = 'ru-RU') => {
	const start = new Date(startISO);
	const end = new Date(endISO);
	const sameDay = start.toDateString() === end.toDateString();

	const dateFmt = new Intl.DateTimeFormat(locale, {
		weekday: 'short',
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});
	const timeFmt = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' });

	if (sameDay) {
		return {
			date: dateFmt.format(start),
			time: `${timeFmt.format(start)} — ${timeFmt.format(end)}`,
			full: `${dateFmt.format(start)}, ${timeFmt.format(start)} — ${timeFmt.format(end)}`,
		};
	}

	return {
		date: `${dateFmt.format(start)} — ${dateFmt.format(end)}`,
		time: `${timeFmt.format(start)} — ${timeFmt.format(end)}`,
		full: `${dateFmt.format(start)} ${timeFmt.format(start)} — ${dateFmt.format(end)} ${timeFmt.format(end)}`,
	};
};
