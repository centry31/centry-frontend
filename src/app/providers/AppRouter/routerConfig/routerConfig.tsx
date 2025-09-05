import type { RouteProps } from 'react-router-dom';
import { MagicLinkPage } from 'pages/MagicLinkPage';
import { MainPage } from 'pages/MainPage';

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
	initedOnly?: boolean;
};

/** Конфигурация путей всего приложения */
export enum Routes {
	MAIN = 'main',
	MAGIC_LINK = 'magicLink',
}

export type Path = '/' | '/auth/magic-link';

export const RoutesPaths: Record<Routes, Path> = {
	[Routes.MAIN]: '/',
	[Routes.MAGIC_LINK]: '/auth/magic-link',
	// // 404
	// [Routes.NOT_FOUND]: '*',
};

export const routerConfig: Record<Routes, AppRoutesProps> = {
	[Routes.MAIN]: {
		path: RoutesPaths.main,
		element: <MainPage />,
		// authOnly: true,
		// initedOnly: false,
	},
	[Routes.MAGIC_LINK]: {
		path: RoutesPaths.magicLink,
		element: <MagicLinkPage />,
	},
	// [Routes.NOT_FOUND]: {
	// 	path: RoutesPaths.notFound,
	// 	element: <NotFoundPage />,
	// },
};
