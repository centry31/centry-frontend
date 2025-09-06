import { useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import type { AppRoutesProps } from '../routerConfig/routerConfig';
import { routerConfig } from '../routerConfig/routerConfig';
import { CheckRequirements } from '../ui/CheckRequirements';

/**
 * Рендерит все маршруты и проставляет разрешения на просмотр.
 * */
export const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		const element = route.element;

		return (
			<Route
				key={route.path}
				path={route.path}
				element={
					<CheckRequirements isAuthRequired={route.authOnly}>{element}</CheckRequirements>
				}
			/>
		);
	}, []);

	return <Routes>{Object.values(routerConfig).map(renderWithWrapper)}</Routes>;
};
