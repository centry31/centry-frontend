import { parseAbsoluteToLocal } from '@internationalized/date';

/**
 * Безопасный парсер: берём строку, пытаемся привести к ISO и преобразовать в ZonedDateTime.
 * Если дата невалидная/пустая — возвращаем текущее время, чтобы не падать.
 */
export const safeParseAbsoluteToLocal = (value?: string | null) => {
	const fallback = new Date().toISOString();
	let iso = fallback;
	if (typeof value === 'string' && value.trim() !== '') {
		// Попробуем нормализовать любую входящую строку в корректный ISO
		const ms = Date.parse(value);
		if (!Number.isNaN(ms)) {
			iso = new Date(ms).toISOString();
		} else {
			// Бывают строки без Z/с оффсетом — попробуем добавить 'Z' как абсолют
			try {
				iso = new Date(
					value + (/[zZ]|[+-]\d{2}:?\d{2}$/.test(value) ? '' : 'Z'),
				).toISOString();
			} catch {
				iso = fallback;
			}
		}
	}
	try {
		return parseAbsoluteToLocal(iso);
	} catch {
		return parseAbsoluteToLocal(fallback);
	}
};
