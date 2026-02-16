import type { RefObject } from 'react';

import { useLoginTelegramWidget as useTelegramLoginWidgetApi, useUserStore } from 'entities/User';

import type { TelegramUserPayload } from './types';

export const useTelegramWidget = () => {
	const { initAuthData } = useUserStore();
	const { request: loginWithTelegram } = useTelegramLoginWidgetApi();

	const handleLogin = (userPayload: TelegramUserPayload) => {
		loginWithTelegram(userPayload).then(initAuthData);
	};

	const initLoginWidget = (botName: string, containerRef: RefObject<HTMLDivElement>) => {
		(window as any).TelegramOnAuthCb = (user: TelegramUserPayload) => handleLogin(user);

		const script = document.createElement('script');
		script.src = 'https://telegram.org/js/telegram-widget.js?21';
		script.async = true;

		script.setAttribute('data-telegram-login', botName);
		script.setAttribute('data-request-access', 'write');
		script.setAttribute('data-onauth', 'TelegramOnAuthCb(user)');
		script.setAttribute('data-lang', 'ru');

		containerRef.current?.appendChild(script);

		return () => {
			containerRef.current?.removeChild(script);
			(window as any).TelegramOnAuthCb = undefined;
		};
	};

	return { initLoginWidget };
};
