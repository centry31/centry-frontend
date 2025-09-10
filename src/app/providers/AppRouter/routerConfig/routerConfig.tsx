import type { RouteProps } from 'react-router-dom';

import { CalendarPage } from 'pages/CalendarPage';
import { CreateSpacePage } from 'pages/CreateSpacePage';
import { LoginWithTelegramPage } from 'pages/LoginWithTelegramPage';
import { MagicLinkPage } from 'pages/MagicLinkPage';
import { SpaceDetailsPage } from 'pages/SpaceDetailsPage';
import { SpacesPage } from 'pages/SpacesPage';
import { WelcomePage } from 'pages/WelcomePage';

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
};

/** Конфигурация путей всего приложения */
export enum Routes {
	MAGIC_LINK = 'magicLink',
	CALENDAR = 'calendar',
	LOGIN_WITH_TELEGRAM = 'loginWithTelegram',
	WELCOME = 'welcome',
	SPACES = 'spaces',
	SPACE_DETAILS = 'spaceDetails',
	CREATE_SPACE = 'createSpace',
}

export type Path =
	| '/auth/magic-link'
	| '/calendar'
	| '/login'
	| '/welcome'
	| '/spaces'
	| '/spaces/:spaceId'
	| '/spaces/create';

export const RoutesPaths: Record<Routes, Path> = {
	[Routes.MAGIC_LINK]: '/auth/magic-link',
	[Routes.CALENDAR]: '/calendar',
	[Routes.LOGIN_WITH_TELEGRAM]: '/login',
	[Routes.WELCOME]: '/welcome',
	[Routes.SPACES]: '/spaces',
	[Routes.SPACE_DETAILS]: '/spaces/:spaceId',
	[Routes.CREATE_SPACE]: '/spaces/create',
	// // 404
	// [Routes.NOT_FOUND]: '*',
};

export const routerConfig: Record<Routes, AppRoutesProps> = {
	[Routes.MAGIC_LINK]: {
		path: RoutesPaths.magicLink,
		element: <MagicLinkPage />,
	},
	[Routes.CALENDAR]: {
		path: RoutesPaths.calendar,
		element: <CalendarPage />,
		authOnly: true,
	},
	[Routes.LOGIN_WITH_TELEGRAM]: {
		path: RoutesPaths.loginWithTelegram,
		element: <LoginWithTelegramPage />,
	},
	[Routes.WELCOME]: {
		path: RoutesPaths.welcome,
		element: <WelcomePage />,
	},
	[Routes.SPACES]: {
		path: RoutesPaths.spaces,
		element: <SpacesPage />,
		authOnly: true,
	},
	[Routes.SPACE_DETAILS]: {
		path: RoutesPaths.spaceDetails,
		element: <SpaceDetailsPage />,
		authOnly: true,
	},
	[Routes.CREATE_SPACE]: {
		path: RoutesPaths.createSpace,
		element: <CreateSpacePage />,
		authOnly: true,
	},
	// [Routes.NOT_FOUND]: {
	// 	path: RoutesPaths.notFound,
	// 	element: <NotFoundPage />,
	// },
};
