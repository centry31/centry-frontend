import { useEffect, useRef, useState } from 'react';

import { useInitTelegramWidget } from '../model/useInitTelegramWidget';

type Props = {
	clientId: string;
};

export const TelegramLoginWidget = (props: Props) => {
	const { clientId } = props;

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const containerRef = useRef<HTMLDivElement | null>(null);

	const { initTelegramWidget } = useInitTelegramWidget();

	useEffect(() => {
		setError('');
		const callback = initTelegramWidget({
			clientId,
			containerRef,

			onError: setError,
			onLoadingChange: setIsLoading,
		});

		return callback;
	}, [clientId, initTelegramWidget]);

	return (
		<div className="w-full flex flex-col items-center gap-3">
			<div ref={containerRef} className="w-full flex justify-center" />

			{isLoading && (
				<div className="text-sm text-neutral-600">
					Подготавливаем вход через Telegram...
				</div>
			)}

			{error && (
				<div className="w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
					{error}
				</div>
			)}
		</div>
	);
};
