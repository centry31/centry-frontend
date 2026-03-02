import type { RefObject } from 'react';

import {
	useLoginWithTelegramWidget as useTelegramLoginWidgetApi,
	useUserStore,
} from 'entities/User';

import { notifySuccess } from 'shared/lib';

import type { TelegramUserPayload } from './types';

export const useInitTelegramWidget = () => {
	const { initAuthData } = useUserStore();
	const { request: loginWithTelegram } = useTelegramLoginWidgetApi();

	const handleLogin = async (userPayload: TelegramUserPayload) => {
		const result = await loginWithTelegram(userPayload);
		if (result === undefined) return;
		notifySuccess('Вход через Telegram выполнен');
		initAuthData();
	};

	const initTelegramWidget = (botName: string, containerRef: RefObject<HTMLDivElement>) => {
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

	return { initTelegramWidget };
};
