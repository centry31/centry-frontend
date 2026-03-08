import { generatePath } from 'react-router-dom';
import { CalendarDays, CheckCircle2, Compass, PlusCircle, Sparkles, UserPlus } from 'lucide-react';

import type { SpaceAccess } from 'entities/Space';

import { RoutesPaths } from 'shared/configs';

import type {
	FirstLoginOnboardingFlow,
	FirstLoginOnboardingSource,
	FirstLoginOnboardingStep,
} from '../model/types';

type BuildFirstLoginOnboardingFlowProps = {
	hasSpaces: boolean;
	selectedSpaceId?: string;
	selectedSpaceAccess?: SpaceAccess;
	source: FirstLoginOnboardingSource;
};

const getTelegramStepByAccess = (props: {
	selectedSpaceAccess?: SpaceAccess;
	spaceCalendarPath?: string;
	spaceSettingsPath?: string;
}): FirstLoginOnboardingStep => {
	const { selectedSpaceAccess, spaceCalendarPath, spaceSettingsPath } = props;

	if (selectedSpaceAccess === 'owner') {
		return {
			title: 'Подключите Telegram-уведомления',
			description:
				'Так участники будут получать напоминания вовремя и меньше терять контекст.',
			cta: 'К настройкам',
			path: spaceSettingsPath,
			Icon: CheckCircle2,
		};
	}

	return {
		title: 'Проверьте ближайшие события',
		description:
			'Настройки Telegram доступны владельцу пространства. Для вас главное - следить за обновлениями в календаре.',
		cta: 'Открыть календарь',
		path: spaceCalendarPath,
		Icon: CheckCircle2,
	};
};

export const buildFirstLoginOnboardingFlow = (
	props: BuildFirstLoginOnboardingFlowProps,
): FirstLoginOnboardingFlow => {
	const { hasSpaces, selectedSpaceId, selectedSpaceAccess, source } = props;

	const spaceDetailsPath =
		selectedSpaceId && generatePath(RoutesPaths.spaceDetails, { spaceId: selectedSpaceId });
	const spaceCalendarPath =
		selectedSpaceId && generatePath(RoutesPaths.calendar, { spaceId: selectedSpaceId });
	const spaceSettingsPath =
		selectedSpaceId &&
		generatePath(RoutesPaths.spaceSettingsList, { spaceId: selectedSpaceId });

	if (source === 'invite' && hasSpaces && selectedSpaceId) {
		return {
			eyebrow: 'Вы в пространстве',
			title: 'Приглашение принято',
			description: 'Осталось пройти короткий старт, чтобы не потерять важные события.',
			steps: [
				{
					title: 'Проверьте карточку пространства',
					description: 'Убедитесь, что описание и участники соответствуют вашей группе.',
					cta: 'Открыть пространство',
					path: spaceDetailsPath,
					Icon: Compass,
				},
				{
					title: 'Откройте календарь команды',
					description: 'Здесь будет единый план: пары, встречи, дедлайны и переносы.',
					cta: 'Открыть календарь',
					path: spaceCalendarPath,
					Icon: CalendarDays,
				},
				getTelegramStepByAccess({
					selectedSpaceAccess,
					spaceCalendarPath,
					spaceSettingsPath,
				}),
			],
		};
	}

	if (hasSpaces && selectedSpaceId) {
		return {
			eyebrow: 'Быстрый старт',
			title: 'Пространство уже готово',
			description: 'Давайте пройдём по ключевым точкам, чтобы начать без лишних шагов.',
			steps: [
				{
					title: 'Откройте текущее пространство',
					description: 'Проверьте участников, описание и структуру перед началом работы.',
					cta: 'К пространству',
					path: spaceDetailsPath,
					Icon: Compass,
				},
				{
					title: 'Перейдите в календарь',
					description: 'Все события команды будут собраны в одном месте.',
					cta: 'Открыть календарь',
					path: spaceCalendarPath,
					Icon: CalendarDays,
				},
				getTelegramStepByAccess({
					selectedSpaceAccess,
					spaceCalendarPath,
					spaceSettingsPath,
				}),
			],
		};
	}

	return {
		eyebrow: 'Добро пожаловать',
		title: 'Соберём ваш первый рабочий контур',
		description: 'Пара шагов, и у вас будет пространство с участниками и календарём.',
		steps: [
			{
				title: 'Создайте первое пространство',
				description:
					'Это база команды: участники, события и настройки будут храниться в одном месте.',
				cta: 'Создать пространство',
				path: RoutesPaths.createSpace,
				Icon: PlusCircle,
			},
			{
				title: 'Или вступите по ссылке-приглашению',
				description:
					'Если пространство уже есть, откройте invite-ссылку от владельца и подтвердите вступление.',
				Icon: UserPlus,
			},
			{
				title: 'Откройте список пространств',
				description:
					'Когда первое пространство появится, начните планирование через календарь.',
				cta: 'Открыть пространства',
				path: RoutesPaths.spaces,
				Icon: Sparkles,
			},
		],
	};
};
