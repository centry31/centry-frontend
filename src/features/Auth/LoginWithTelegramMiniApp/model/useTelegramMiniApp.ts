import { useLoginTelegramMiniApp as useLoginTelegramMiniAppApi, useUserStore } from 'entities/User';

export const useTelegramMiniApp = () => {
	const { initAuthData } = useUserStore();
	const { request: loginWithTelegramMiniApp } = useLoginTelegramMiniAppApi();

	const initTelegramMiniApp = () => {
		const tg = window.Telegram?.WebApp;
		const handleBackButton = () => window.history.back();

		if (tg?.initData) {
			tg.ready();
			tg.expand();
			tg.BackButton?.onClick(handleBackButton);
			tg.BackButton?.show();
			loginWithTelegramMiniApp({ initData: tg.initData }).then(() => initAuthData());
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
