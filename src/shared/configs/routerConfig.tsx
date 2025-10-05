/* eslint-disable @conarti/feature-sliced/layers-slices */

import type { RouteProps } from 'react-router-dom';

import { LoginWithTelegramPage } from 'pages/Auth/LoginWithTelegramPage';
import { MagicLinkPage } from 'pages/Auth/MagicLinkPage';
import { CalendarPage } from 'pages/Calendar/CalendarPage';
import { WelcomePage } from 'pages/Landing/WelcomePage';
import { CreateSpacePage } from 'pages/Space/CreateSpacePage';
import { JoinSpaceInviteCodePage } from 'pages/Space/JoinSpaceInviteCodePage';
import { SpaceDetailsPage } from 'pages/Space/SpaceDetailsPage';
import { SpaceSettingsInviteCodesPage } from 'pages/Space/SpaceSettingsInviteCodesPage';
import { SpaceSettingsListPage } from 'pages/Space/SpaceSettingsListPage';
import { SpaceSettingsMembersPage } from 'pages/Space/SpaceSettingsMembersPage';
import { SpaceSettingsPage } from 'pages/Space/SpaceSettingsPage';
import { SpaceSettingsTgChatsPage } from 'pages/Space/SpaceSettingsTgChatsPage';
import { SpacesPage } from 'pages/Space/SpacesPage';

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
	SPACE_DETAILS = 'spaceDetails',
	SPACE_SETTINGS_LIST = 'spaceSettingsList',
	SPACE_SETTINGS = 'spaceSettings',
	SPACE_MEMBERS = 'spaceMembers',
	SPACE_INVITE_CODES = 'spaceInviteCodes',
	SPACE_TG_CHATS = 'spaceTgChats',

	CREATE_SPACE = 'createSpace',
	JOIN_SPACE_WITH_INVITE_CODE = 'joinSpaceWithInviteCode',
}

export type Path =
	| '/auth/magic-link'
	| '/calendar'
	| '/login'
	| '/welcome'
	//
	| '/spaces'
	| '/spaces/settings/:spaceId'
	| '/spaces/settings/:spaceId/members'
	| '/spaces/settings/:spaceId/settings'
	| '/spaces/settings/:spaceId/invite-codes'
	| '/spaces/settings/:spaceId/tg-chats'
	//
	| '/spaces/details/:spaceId'
	//
	| '/spaces/create'
	| '/spaces/join';

export const RoutesPaths: Record<Routes, Path> = {
	[Routes.MAGIC_LINK]: '/auth/magic-link',
	[Routes.CALENDAR]: '/calendar',
	[Routes.LOGIN_WITH_TELEGRAM]: '/login',
	[Routes.WELCOME]: '/welcome',

	[Routes.SPACES]: '/spaces',
	[Routes.SPACE_SETTINGS_LIST]: '/spaces/settings/:spaceId',
	[Routes.SPACE_MEMBERS]: '/spaces/settings/:spaceId/members',
	[Routes.SPACE_SETTINGS]: '/spaces/settings/:spaceId/settings',
	[Routes.SPACE_INVITE_CODES]: '/spaces/settings/:spaceId/invite-codes',
	[Routes.SPACE_TG_CHATS]: '/spaces/settings/:spaceId/tg-chats',

	[Routes.SPACE_DETAILS]: '/spaces/details/:spaceId',

	[Routes.CREATE_SPACE]: '/spaces/create',
	[Routes.JOIN_SPACE_WITH_INVITE_CODE]: '/spaces/join',
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
		element: <SpaceSettingsMembersPage />,
		authOnly: true,
	},
	[Routes.SPACE_SETTINGS]: {
		path: RoutesPaths.spaceSettings,
		element: <SpaceSettingsPage />,
		authOnly: true,
	},
	[Routes.SPACE_INVITE_CODES]: {
		path: RoutesPaths.spaceInviteCodes,
		element: <SpaceSettingsInviteCodesPage />,
		authOnly: true,
	},
	[Routes.SPACE_TG_CHATS]: {
		path: RoutesPaths.spaceTgChats,
		element: <SpaceSettingsTgChatsPage />,
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
	[Routes.JOIN_SPACE_WITH_INVITE_CODE]: {
		path: RoutesPaths.joinSpaceWithInviteCode,
		element: <JoinSpaceInviteCodePage />,
		authOnly: true,
	},
	// [Routes.NOT_FOUND]: {
	// 	path: RoutesPaths.notFound,
	// 	element: <NotFoundPage />,
	// },
};
