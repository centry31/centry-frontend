import { useEffect, useRef } from 'react';

import { useTelegramLogin, useUserStore } from 'entities/User';

import type { TelegramUserPayload } from '../model/types';

type Props = {
	botName: string;
};

// TODO: refactoring
export const TelegramLoginButton = (props: Props) => {
	const { botName } = props;
	const _containerRef = useRef<HTMLDivElement | null>(null);

	const { initAuthData } = useUserStore();
	const { request: loginWithTelegram } = useTelegramLogin();

	const handleLogin = (userPayload: TelegramUserPayload) => {
		loginWithTelegram(userPayload).then(initAuthData);
	};

	useEffect(() => {
		(window as any).TelegramOnAuthCb = (user: TelegramUserPayload) => handleLogin(user);

		const script = document.createElement('script');
		script.src = 'https://telegram.org/js/telegram-widget.js?21';
		script.async = true;

		script.setAttribute('data-telegram-login', botName);
		script.setAttribute('data-request-access', 'write');
		script.setAttribute('data-onauth', 'TelegramOnAuthCb(user)');
		script.setAttribute('data-lang', 'ru');

		_containerRef.current?.appendChild(script);

		return () => {
			_containerRef.current?.removeChild(script);
			(window as any).TelegramOnAuthCb = undefined;
		};
	}, [botName]);

	return <div ref={_containerRef} />;
};
