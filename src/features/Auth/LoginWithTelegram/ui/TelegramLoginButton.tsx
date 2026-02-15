import { useEffect, useRef } from 'react';

import { useTelegramLoginButton } from '../model/useTelegramLoginButton';

type Props = {
	botName: string;
};

export const TelegramLoginButton = (props: Props) => {
	const { botName } = props;

	const _containerRef = useRef<HTMLDivElement | null>(null);

	const { initLoginWidget } = useTelegramLoginButton();

	useEffect(() => {
		initLoginWidget(botName, _containerRef);
	}, [botName, initLoginWidget]);

	return <div ref={_containerRef} />;
};
