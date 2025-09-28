import React, { useEffect } from 'react';
import { useMatch } from 'react-router';
import { HeroUIProvider, Spinner } from '@heroui/react';

import { NavbarAuth } from 'widgets/Auth/NavbarAuth';
import { NavbarGuest } from 'widgets/Auth/NavbarGuest';

import { useUserStore } from 'entities/User';

import { RoutesPaths } from 'shared/configs';

import { AppRouter } from './providers/AppRouter';

import './styles/index.css';

const App = () => {
	const { isInit, initAuthData, authData } = useUserStore();

	useEffect(() => {
		initAuthData();
	}, [initAuthData]);

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
