import { HeroUIProvider } from '@heroui/react';
import classNames from 'classnames';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './providers/AppRouter';

import './styles/index.css';
import './styles/reset.css';

const App = () => {
	// if (!_init) {
	// 	return <LoadScreen label={'UniShare'} />;
	// }

	return (
		<HeroUIProvider>
			<BrowserRouter>
				<div className={classNames('App', 'content-page')}>
					<AppRouter />
				</div>
			</BrowserRouter>
		</HeroUIProvider>
	);
};

export default App;
