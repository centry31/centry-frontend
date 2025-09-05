import { useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerConfig } from '../routerConfig/routerConfig';
import type { AppRoutesProps } from '../routerConfig/routerConfig';
import { CheckRequirements } from '../ui/CheckRequirements';

/** Рендерит все маршруты и проставляет разрешения на просмотр. Также показывает LoadScreen при загрузке
 * новой страницы с сервисом */
export const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		const element = route.element;

		return (
			<Route
				key={route.path}
				path={route.path}
				element={
					<CheckRequirements
						isInitRequired={route.initedOnly}
						isAuthRequired={route.authOnly}
					>
						{element}
					</CheckRequirements>
				}
			/>
		);
	}, []);

	return <Routes>{Object.values(routerConfig).map(renderWithWrapper)}</Routes>;
};
