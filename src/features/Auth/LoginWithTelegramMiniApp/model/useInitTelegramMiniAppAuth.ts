import { useCallback } from 'react';

import { useLoginWithTelegramMiniApp, useUserStore } from 'entities/User';

import { TG_MINI_APP_REDIRECT_LINK_SESSION_STORAGE_KEY } from 'shared/const';
import { notifySuccess, parseTelegramStartParam } from 'shared/lib';

export const useInitTelegramMiniAppAuth = () => {
	const { initAuthData } = useUserStore();
	const { request: loginWithTelegramMiniApp } = useLoginWithTelegramMiniApp();

	const handleLoginWithTelegramMiniApp = useCallback(
		async (initData: string) => {
			const result = await loginWithTelegramMiniApp({ initData });
			if (result === undefined) return;
			notifySuccess('Вход через Telegram выполнен');
			initAuthData();
		},
		[initAuthData, loginWithTelegramMiniApp],
	);

	const initTelegramMiniApp = useCallback(() => {
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

		const redirectMiniAppLink = tg?.initDataUnsafe?.start_param;
		if (typeof redirectMiniAppLink === 'string') {
			const parsedRedirectPath = parseTelegramStartParam(redirectMiniAppLink);

			if (parsedRedirectPath) {
				sessionStorage.setItem(
					TG_MINI_APP_REDIRECT_LINK_SESSION_STORAGE_KEY,
					parsedRedirectPath,
				);
			}
		}

		return () => {
			tg?.BackButton?.offClick(handleBackButton);
			tg?.BackButton?.hide();
		};
	}, [handleLoginWithTelegramMiniApp, initAuthData]);

	return {
		initTelegramMiniApp,
	};
};
