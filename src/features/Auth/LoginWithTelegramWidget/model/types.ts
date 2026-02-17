type TelegramUserPayload = {
	id: number;
	username?: string;
	photo_url?: string;
	first_name: string;
	last_name?: string;
	auth_date: number;
	hash: string;
};

export { TelegramUserPayload };
