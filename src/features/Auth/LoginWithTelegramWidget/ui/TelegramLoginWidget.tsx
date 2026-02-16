import { useEffect, useRef } from 'react';

import { useTelegramWidget } from '../model/useTelegramWidget';

type Props = {
	botName: string;
};

export const TelegramLoginWidget = (props: Props) => {
	const { botName } = props;

	const _containerRef = useRef<HTMLDivElement | null>(null);

	const { initLoginWidget } = useTelegramWidget();

	useEffect(() => {
		initLoginWidget(botName, _containerRef);
	}, [botName, initLoginWidget]);

	return <div ref={_containerRef} />;
};
