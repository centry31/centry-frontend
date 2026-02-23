import { useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import type { AppRoutesProps } from 'shared/configs';
import { routerConfig } from 'shared/configs';

import { CheckRequirements } from '../ui/CheckRequirements';
import { RequireSpace } from './RequireSpace';

/**
 * Рендерит все маршруты и проставляет разрешения на просмотр.
 * */
export const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		const element = route.requireSpace ? (
			<RequireSpace>{route.element}</RequireSpace>
		) : (
			route.element
		);

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
