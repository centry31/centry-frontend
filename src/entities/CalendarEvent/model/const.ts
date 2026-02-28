import type { FrequencySelectItem } from './types';

const REMINDERS_PRESETS = [1, 5, 15, 30, 60, 1440];
const FREQUENCY_PRESETS: FrequencySelectItem[] = [
	{ key: 'NEVER', label: 'Никогда' },
	{ key: 'DAILY', label: 'Каждый день' },
	{ key: 'WEEKLY', label: 'Каждую неделю' },
	{ key: 'DOUBLE_WEEKLY', label: 'Каждые 2 недели' },
	{ key: 'MONTHLY', label: 'Каждый месяц' },
];

export { FREQUENCY_PRESETS, REMINDERS_PRESETS };
