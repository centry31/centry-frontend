import type { RecurrenceSelectItem } from './types';


const REMINDERS_PRESETS = [1, 5, 15, 30, 60, 1440];
const RECURRENCE_PRESETS: RecurrenceSelectItem[] = [
	{ key: 'NONE', label: 'Никогда' },
	{ key: 'DAILY', label: 'Каждый день' },
	{ key: 'WEEKLY', label: 'Каждую неделю' },
	{ key: 'DOUBLE_WEEKLY', label: 'Каждые 2 недели' },
	{ key: 'MONTHLY', label: 'Каждый месяц' },
];

export { RECURRENCE_PRESETS, REMINDERS_PRESETS };
