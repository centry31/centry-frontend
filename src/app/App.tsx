import React, { useEffect } from 'react';
import { useMatch } from 'react-router';
import { HeroUIProvider, Spinner } from '@heroui/react';

import { NavbarAuth } from 'widgets/Auth/NavbarAuth';
import { NavbarGuest } from 'widgets/Auth/NavbarGuest';

import { useTelegramMiniApp } from 'features/Auth/LoginWithTelegramMiniApp';

import { useUserStore } from 'entities/User';

import { RoutesPaths } from 'shared/configs';

import { AppRouter } from './providers/AppRouter';

import './styles/index.css';

const App = () => {
	const { isInit, authData } = useUserStore();
	const { initTelegramMiniApp } = useTelegramMiniApp();

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
