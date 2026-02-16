import { useEffect, useRef } from 'react';

import { useInitTelegramWidget } from '../model/useInitTelegramWidget';

type Props = {
	botName: string;
};

export const TelegramLoginWidget = (props: Props) => {
	const { botName } = props;

	const _containerRef = useRef<HTMLDivElement | null>(null);

	const { initTelegramWidget } = useInitTelegramWidget();

	useEffect(() => {
		const callback = initTelegramWidget(botName, _containerRef);
		return callback;
	}, [botName, initTelegramWidget]);

	return <div ref={_containerRef} />;
};
