import type { RouteProps } from 'react-router-dom';

import { CalendarPage } from 'pages/CalendarPage';
import { CreateSpacePage } from 'pages/CreateSpacePage';
import { JoinSpaceInvitePage } from 'pages/JoinSpaceInvitePage';
import { LoginWithTelegramPage } from 'pages/LoginWithTelegramPage';
import { MagicLinkPage } from 'pages/MagicLinkPage';
import { SpaceInviteLinksPage } from 'pages/SpaceInviteLinksPage';
import { SpaceLinkedTgChatsPage } from 'pages/SpaceLinkedTgChatsPage';
import { SpaceMembersPage } from 'pages/SpaceMembersPage';
import { SpaceSettingsListPage } from 'pages/SpaceSettingsListPage';
import { SpaceSettingsPage } from 'pages/SpaceSettingsPage';
import { SpacesPage } from 'pages/SpacesPage';
import { WelcomePage } from 'pages/WelcomePage';

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
	SPACE_LINKED_TG_CHATS = 'spaceLinkedTgChats',

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
	| '/spaces/:spaceId/linked-tg-chats'
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
	[Routes.SPACE_LINKED_TG_CHATS]: '/spaces/:spaceId/linked-tg-chats',

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
	[Routes.SPACE_LINKED_TG_CHATS]: {
		path: RoutesPaths.spaceLinkedTgChats,
		element: <SpaceLinkedTgChatsPage />,
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
