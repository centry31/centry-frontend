import React, { useEffect } from 'react';
import { useMatch } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { HeroUIProvider, Spinner, ToastProvider } from '@heroui/react';

import { NavbarAuth } from 'widgets/Auth/NavbarAuth';
import { NavbarGuest } from 'widgets/Auth/NavbarGuest';
import { FirstLoginOnboarding } from 'widgets/Onboarding/FirstLoginOnboarding';

import { useInitTelegramMiniAppAuth } from 'features/Auth/LoginWithTelegramMiniApp';

import { useUserStore } from 'entities/User';

import { RoutesPaths } from 'shared/configs';
import {
	PENDING_AUTH_REDIRECT_LINK_SESSION_STORAGE_KEY,
	TG_MINI_APP_REDIRECT_LINK_SESSION_STORAGE_KEY,
} from 'shared/const';

import { AppRouter } from './providers/AppRouter';

import './styles/index.css';

const App = () => {
	const navigate = useNavigate();
	const { isInit, authData } = useUserStore();
	const { initTelegramMiniApp } = useInitTelegramMiniAppAuth();

	useEffect(() => {
		const callback = initTelegramMiniApp();
		return callback;
	}, []);

	useEffect(() => {
		const tgMiniAppLink = sessionStorage.getItem(TG_MINI_APP_REDIRECT_LINK_SESSION_STORAGE_KEY);
		const pendingAuthRedirectLink = sessionStorage.getItem(
			PENDING_AUTH_REDIRECT_LINK_SESSION_STORAGE_KEY,
		);

		if (!authData) return;

		if (tgMiniAppLink) {
			sessionStorage.removeItem(TG_MINI_APP_REDIRECT_LINK_SESSION_STORAGE_KEY);
			sessionStorage.removeItem(PENDING_AUTH_REDIRECT_LINK_SESSION_STORAGE_KEY);
			navigate(tgMiniAppLink);
			return;
		}

		if (!pendingAuthRedirectLink) return;

		sessionStorage.removeItem(PENDING_AUTH_REDIRECT_LINK_SESSION_STORAGE_KEY);
		navigate(pendingAuthRedirectLink);
	}, [authData, navigate]);

	const isWelcomePage = Boolean(useMatch(RoutesPaths.welcome));

	// TODO: add load screen
	if (!isInit) return <Spinner />;
	return (
		<HeroUIProvider locale={'ru-RU'} className={'h-full'}>
			<div className={'App'}>
				<ToastProvider placement={'top-right'} />

				{authData && <NavbarAuth />}
				{!isWelcomePage && !authData && <NavbarGuest />}
				{authData && <FirstLoginOnboarding userId={authData.id} />}

				<div className={'content'}>
					<AppRouter />
				</div>
			</div>
		</HeroUIProvider>
	);
};

export default App;
