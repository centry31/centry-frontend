import { useLoginWithTelegramMiniApp, useUserStore } from 'entities/User';

import { notifySuccess } from 'shared/lib';

export const useInitTelegramMiniAppAuth = () => {
	const { initAuthData } = useUserStore();
	const { request: loginWithTelegramMiniApp } = useLoginWithTelegramMiniApp();

	const handleLoginWithTelegramMiniApp = async (initData: string) => {
		const result = await loginWithTelegramMiniApp({ initData });
		if (result === undefined) return;
		notifySuccess('Вход через Telegram выполнен');
		initAuthData();
	};

	const initTelegramMiniApp = () => {
		const tg = window.Telegram?.WebApp;
		const handleBackButton = () => window.history.back();

		if (tg?.initData) {
			tg.ready();
			tg.expand();
			tg.BackButton?.onClick(handleBackButton);
			tg.BackButton?.show();
			void handleLoginWithTelegramMiniApp(tg.initData);
			tg?.requestFullsize?.();
		} else {
			initAuthData();
		}

		return () => {
			tg?.BackButton?.offClick(handleBackButton);
			tg?.BackButton?.hide();
		};
	};

	return {
		initTelegramMiniApp,
	};
};
