import type { RouteProps } from 'react-router-dom';

import { LoginWithTelegramPage } from 'pages/Auth/LoginWithTelegramPage';
import { MagicLinkPage } from 'pages/Auth/MagicLinkPage';
import { CalendarPage } from 'pages/Calendar/CalendarPage';
import { WelcomePage } from 'pages/Landing/WelcomePage';
import { CreateSpacePage } from 'pages/Space/CreateSpacePage';
import { JoinSpaceInvitePage } from 'pages/Space/JoinSpaceInvitePage';
import { SpaceInviteLinksPage } from 'pages/Space/SpaceInviteLinksPage';
import { SpaceMembersPage } from 'pages/Space/SpaceMembersPage';
import { SpaceSettingsListPage } from 'pages/Space/SpaceSettingsListPage';
import { SpaceSettingsPage } from 'pages/Space/SpaceSettingsPage';
import { SpacesPage } from 'pages/Space/SpacesPage';
import { SpaceTgChatsPage } from 'pages/Space/SpaceTgChatsPage';

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
};

/** Конфигурация путей всего приложения */
export enum Routes {
	WELCOME = 'welcome',
	MAGIC_LINK = 'magicLink',
	CALENDAR = 'calendar',
	LOGIN_WITH_TELEGRAM = 'loginWithTelegram',

	SPACES = 'spaces',
	SPACE_SETTINGS_LIST = 'spaceSettingsList',
	SPACE_SETTINGS = 'spaceSettings',
	SPACE_MEMBERS = 'spaceMembers',
	SPACE_INVITE_LINKS = 'spaceInviteLinks',
	SPACE_TG_CHATS = 'spaceTgChats',

	CREATE_SPACE = 'createSpace',
	JOIN_SPACE_WITH_LINK = 'joinSpaceWithLink',
}

export type Path =
	| '/auth/magic-link'
	| '/calendar'
	| '/login'
	| '/welcome'
	//
	| '/spaces'
	| '/spaces/:spaceId'
	| '/spaces/:spaceId/members'
	| '/spaces/:spaceId/settings'
	| '/spaces/:spaceId/invite-links'
	| '/spaces/:spaceId/tg-chats'
	//
	| '/spaces/create'
	| '/spaces/join';

export const RoutesPaths: Record<Routes, Path> = {
	[Routes.MAGIC_LINK]: '/auth/magic-link',
	[Routes.CALENDAR]: '/calendar',
	[Routes.LOGIN_WITH_TELEGRAM]: '/login',
	[Routes.WELCOME]: '/welcome',

	[Routes.SPACES]: '/spaces',
	[Routes.SPACE_SETTINGS_LIST]: '/spaces/:spaceId',
	[Routes.SPACE_MEMBERS]: '/spaces/:spaceId/members',
	[Routes.SPACE_SETTINGS]: '/spaces/:spaceId/settings',
	[Routes.SPACE_INVITE_LINKS]: '/spaces/:spaceId/invite-links',
	[Routes.SPACE_TG_CHATS]: '/spaces/:spaceId/tg-chats',

	[Routes.CREATE_SPACE]: '/spaces/create',
	[Routes.JOIN_SPACE_WITH_LINK]: '/spaces/join',
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
	[Routes.SPACE_SETTINGS_LIST]: {
		path: RoutesPaths.spaceSettingsList,
		element: <SpaceSettingsListPage />,
		authOnly: true,
	},
	[Routes.SPACE_MEMBERS]: {
		path: RoutesPaths.spaceMembers,
		element: <SpaceMembersPage />,
		authOnly: true,
	},
	[Routes.SPACE_SETTINGS]: {
		path: RoutesPaths.spaceSettings,
		element: <SpaceSettingsPage />,
		authOnly: true,
	},
	[Routes.SPACE_INVITE_LINKS]: {
		path: RoutesPaths.spaceInviteLinks,
		element: <SpaceInviteLinksPage />,
		authOnly: true,
	},
	[Routes.SPACE_TG_CHATS]: {
		path: RoutesPaths.spaceTgChats,
		element: <SpaceTgChatsPage />,
		authOnly: true,
	},

	[Routes.CREATE_SPACE]: {
		path: RoutesPaths.createSpace,
		element: <CreateSpacePage />,
		authOnly: true,
	},
	[Routes.JOIN_SPACE_WITH_LINK]: {
		path: RoutesPaths.joinSpaceWithLink,
		element: <JoinSpaceInvitePage />,
		authOnly: true,
	},
	// [Routes.NOT_FOUND]: {
	// 	path: RoutesPaths.notFound,
	// 	element: <NotFoundPage />,
	// },
};
