import React, { useEffect } from 'react';
import { useMatch } from 'react-router';
import { HeroUIProvider, Spinner, ToastProvider } from '@heroui/react';

import { NavbarAuth } from 'widgets/Auth/NavbarAuth';
import { NavbarGuest } from 'widgets/Auth/NavbarGuest';

import { useInitTelegramMiniAppAuth } from 'features/Auth/LoginWithTelegramMiniApp';

import { useUserStore } from 'entities/User';

import { RoutesPaths } from 'shared/configs';

import { AppRouter } from './providers/AppRouter';

import './styles/index.css';

const App = () => {
	const { isInit, authData } = useUserStore();
	const { initTelegramMiniApp } = useInitTelegramMiniAppAuth();

	useEffect(() => {
		const callback = initTelegramMiniApp();
		return callback;
	}, []);

	const isWelcomePage = Boolean(useMatch(RoutesPaths.welcome));

	// TODO: add load screen
	if (!isInit) {
		return <Spinner />;
	}

	return (
		<HeroUIProvider locale={'ru-RU'} className={'h-full'}>
			<div className={'App'}>
				<ToastProvider placement={'top-right'} />

				{authData && <NavbarAuth />}
				{!isWelcomePage && !authData && <NavbarGuest />}

				<div className={'content'}>
					<AppRouter />
				</div>
			</div>
		</HeroUIProvider>
	);
};

export default App;
