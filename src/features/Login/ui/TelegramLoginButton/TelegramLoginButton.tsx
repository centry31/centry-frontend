import { useEffect, useRef } from 'react';

import type { TelegramUserPayload } from '../../model/types';

type Props = {
	botName: string;
	onAuthCallback: (user: TelegramUserPayload) => void;
};

export const TelegramLoginButton = (props: Props) => {
	const { botName, onAuthCallback } = props;
	const _containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		(window as any).TelegramOnAuthCb = (user: TelegramUserPayload) => onAuthCallback(user);

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
	}, [botName, onAuthCallback]);

	// TODO: refactoring?
	return <div ref={_containerRef} />;

	// return (
	// 	<div className="relative w-[300px]">
	// 		<div className="absolute top-0.5 left-8 opacity-0" ref={_containerRef} />
	// 		<Button
	// 			style={{
	// 				pointerEvents: 'none',
	// 				background: 'var(--background-gradient-telegram-button)',
	// 			}}
	// 		>
	// 			Войти с тг
	// 		</Button>
	// 	</div>
	// );
};
