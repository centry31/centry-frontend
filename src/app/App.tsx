import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HeroUIProvider, Spinner } from '@heroui/react';

import { Navbar } from 'widgets/Navbar';

import { useUserStore } from 'entities/User';

import { AppRouter } from './providers/AppRouter';

import './styles/index.css';

const App = () => {
	const { isInit, initAuthData } = useUserStore();

	useEffect(() => {
		initAuthData();
	}, [initAuthData]);

	// TODO: add load screen
	if (!isInit) {
		return <Spinner />;
	}

	return (
		<HeroUIProvider locale={'ru-RU'} className={'h-full'}>
			<BrowserRouter>
				<div className={'App'}>
					<Navbar />

					<div className={'content'}>
						<AppRouter />
					</div>
				</div>
			</BrowserRouter>
		</HeroUIProvider>
	);
};

export default App;
