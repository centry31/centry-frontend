const decodeURIComponentSafe = (value: string) => {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
};

const toBase64Url = (value: string) => {
	const bytes = new TextEncoder().encode(value);
	let binary = '';

	bytes.forEach((byte) => {
		binary += String.fromCharCode(byte);
	});

	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const fromBase64Url = (value: string) => {
	const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
	const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
	const binary = atob(padded);
	const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

	return new TextDecoder().decode(bytes);
};

export const encodeTelegramStartParam = (value: string) => {
	return toBase64Url(value);
};

export const parseTelegramStartParam = (startParam: string) => {
	const normalizedParam = decodeURIComponentSafe(startParam.trim());
	if (!normalizedParam) return '';

	try {
		return fromBase64Url(normalizedParam);
	} catch {
		return normalizedParam;
	}
};
