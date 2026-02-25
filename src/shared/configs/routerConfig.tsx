/* eslint-disable @conarti/feature-sliced/layers-slices */
import type { RouteProps } from 'react-router-dom';

import { LoginWithTelegramPage } from 'pages/Auth/LoginWithTelegramPage';
import { ImportBmstuScheduleHintPage } from 'pages/Bmstu/ImportBmstuScheduleHintPage';
import { CalendarPage } from 'pages/Calendar/CalendarPage';
import { WelcomePage } from 'pages/Landing/WelcomePage';
import { NotFoundPage } from 'pages/NotFound/NotFoundPage';
import { CreateSpacePage } from 'pages/Space/CreateSpacePage';
import { JoinSpaceInviteCodePage } from 'pages/Space/JoinSpaceInviteCodePage';
import { NoSpacesPage } from 'pages/Space/NoSpacesPage';
import { SpaceDetailsPage } from 'pages/Space/SpaceDetailsPage';
import { SpaceImportBmstuSchedulePage } from 'pages/Space/SpaceImportBmstuSchedulePage';
import { SpaceSettingsInviteCodesPage } from 'pages/Space/SpaceSettingsInviteCodesPage';
import { SpaceSettingsListPage } from 'pages/Space/SpaceSettingsListPage';
import { SpaceSettingsMembersPage } from 'pages/Space/SpaceSettingsMembersPage';
import { SpaceSettingsPage } from 'pages/Space/SpaceSettingsPage';
import { SpaceSettingsTgChatsPage } from 'pages/Space/SpaceSettingsTgChatsPage';
import { SpacesPage } from 'pages/Space/SpacesPage';

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
	requireSpace?: boolean;
};

/** Конфигурация путей всего приложения */
enum Routes {
	MAIN = 'main',

	WELCOME = 'welcome',
	// MAGIC_LINK = 'magicLink', // TODO: magic-links убраны на неопределенный срок
	CALENDAR = 'calendar',
	LOGIN_WITH_TELEGRAM = 'loginWithTelegram',

	SPACES = 'spaces',
	SPACE_DETAILS = 'spaceDetails',
	SPACE_SETTINGS_LIST = 'spaceSettingsList',
	SPACE_SETTINGS = 'spaceSettings',
	SPACE_MEMBERS = 'spaceMembers',
	SPACE_INVITE_CODES = 'spaceInviteCodes',
	SPACE_TG_CHATS = 'spaceTgChats',
	SPACE_IMPORT_BMSTU_SCHEDULE = 'spaceImportBmstuSchedule',

	CREATE_SPACE = 'createSpace',
	JOIN_SPACE_WITH_INVITE_CODE = 'joinSpaceWithInviteCode',
	NO_SPACES = 'noSpaces',

	IMPORT_BMSTU_SCHEDULE_HINT = 'importBmstuScheduleHint',

	NOT_FOUND = 'notFound',
}

export type Path =
	| '/'
	//
	// | '/auth/magic-link'
	| '/calendar/:spaceId'
	| '/login'
	| '/welcome'
	//
	| '/spaces'
	| '/spaces/settings/:spaceId'
	| '/spaces/settings/:spaceId/members'
	| '/spaces/settings/:spaceId/settings'
	| '/spaces/settings/:spaceId/invite-codes'
	| '/spaces/settings/:spaceId/tg-chats'
	| '/spaces/settings/:spaceId/import-bmstu-schedule'
	//
	| '/spaces/details/:spaceId'
	//
	| '/spaces/create'
	| '/spaces/join'
	| '/spaces/no-spaces'
	//
	| '/spaces/bmstu/:spaceId/import-schedule-hint';

export const RoutesPaths: Record<Routes, Path> = {
	[Routes.MAIN]: '/',

	// [Routes.MAGIC_LINK]: '/auth/magic-link',
	[Routes.CALENDAR]: '/calendar/:spaceId',
	[Routes.LOGIN_WITH_TELEGRAM]: '/login',
	[Routes.WELCOME]: '/welcome',

	[Routes.SPACES]: '/spaces',
	[Routes.SPACE_SETTINGS_LIST]: '/spaces/settings/:spaceId',
	[Routes.SPACE_MEMBERS]: '/spaces/settings/:spaceId/members',
	[Routes.SPACE_SETTINGS]: '/spaces/settings/:spaceId/settings',
	[Routes.SPACE_INVITE_CODES]: '/spaces/settings/:spaceId/invite-codes',
	[Routes.SPACE_TG_CHATS]: '/spaces/settings/:spaceId/tg-chats',
	[Routes.SPACE_IMPORT_BMSTU_SCHEDULE]: '/spaces/settings/:spaceId/import-bmstu-schedule',

	[Routes.SPACE_DETAILS]: '/spaces/details/:spaceId',

	[Routes.CREATE_SPACE]: '/spaces/create',
	[Routes.JOIN_SPACE_WITH_INVITE_CODE]: '/spaces/join',
	[Routes.NO_SPACES]: '/spaces/no-spaces',

	[Routes.IMPORT_BMSTU_SCHEDULE_HINT]: '/spaces/bmstu/:spaceId/import-schedule-hint',

	// @ts-expect-error намеренно
	[Routes.NOT_FOUND]: '*',
};

export const routerConfig: Record<Routes, AppRoutesProps> = {
	[Routes.MAIN]: {
		path: RoutesPaths.main,
		element: <SpacesPage />,
	},

	// [Routes.MAGIC_LINK]: {
	// 	path: RoutesPaths.magicLink,
	// 	element: <MagicLinkPage />,
	// },
	[Routes.CALENDAR]: {
		path: RoutesPaths.calendar,
		element: <CalendarPage />,
		authOnly: true,
		requireSpace: true,
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
	[Routes.SPACE_IMPORT_BMSTU_SCHEDULE]: {
		path: RoutesPaths.spaceImportBmstuSchedule,
		element: <SpaceImportBmstuSchedulePage />,
		authOnly: true,
		requireSpace: true,
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
	[Routes.NO_SPACES]: {
		path: RoutesPaths.noSpaces,
		element: <NoSpacesPage />,
		authOnly: true,
	},

	[Routes.IMPORT_BMSTU_SCHEDULE_HINT]: {
		path: RoutesPaths.importBmstuScheduleHint,
		element: <ImportBmstuScheduleHintPage />,
		authOnly: true,
		requireSpace: true,
	},

	[Routes.NOT_FOUND]: {
		path: RoutesPaths.notFound,
		element: <NotFoundPage />,
	},
};
