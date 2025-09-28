import type { Key, ReactNode } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, Listbox, ListboxItem, Spinner, useDisclosure } from '@heroui/react';
import { ChevronRight, Link2, MessageSquare, Settings, Trash2, Users } from 'lucide-react';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';

import { DeleteSpaceModal } from 'features/Space/DeleteSpace';

import { useGetSpace } from 'entities/Space';

import type { Path } from 'shared/configs';

type Action = 'DELETE_SPACE';

type Item = {
	key: Path | Action;
	title: string;
	description?: string;
	icon: ReactNode;
	danger?: boolean;
	showDivider?: boolean;
	onPress?: () => void; // для кастомного клика (удаление)
};

type Section = {
	id: string;
	title?: string;
	ariaLabel: string;
	items: Item[];
};

export const SpaceSettingsListPage = () => {
	const { spaceId = '' } = useParams();
	const { data: space, isLoading } = useGetSpace({ spaceId });

	const { isOpen, onOpenChange } = useDisclosure();
	const navigate = useNavigate();

	const endChevron = <ChevronRight size={16} className="text-neutral-300 shrink-0" />;

	const handleAction = (key: Key) => {
		if (typeof key !== 'string') return;
		if (key === 'DELETE_SPACE') return; // на onPress

		const path = generatePath(key, { spaceId });
		navigate(path);
	};

	const sections: Section[] = [
		{
			id: 'overview',
			title: 'Обзор',
			ariaLabel: 'space-overview',
			items: [
				{
					key: '/spaces/:spaceId/members',
					title: 'Участники',
					description: 'Список, роли и приглашения',
					icon: <Users size={18} className="text-neutral-600 shrink-0" />,
				},
			],
		},
		{
			id: 'manage',
			title: 'Управление',
			ariaLabel: 'space-manage',
			items: [
				{
					key: '/spaces/:spaceId/settings',
					title: 'Основные настройки',
					description: 'Название, описание, приватность',
					icon: <Settings size={18} className="text-neutral-600 shrink-0" />,
					showDivider: true,
				},
				{
					key: '/spaces/:spaceId/invite-codes',
					title: 'Ссылки для вступления',
					description: 'Публичная ссылка, срок действия, лимиты',
					icon: <Link2 size={18} className="text-neutral-600 shrink-0" />,
				},
			],
		},
		{
			id: 'integrations',
			title: 'Интеграции',
			ariaLabel: 'space-integrations',
			items: [
				{
					key: '/spaces/:spaceId/tg-chats',
					title: 'Привязанные чаты',
					description: 'Группы, каналы, синхронизация',
					icon: <MessageSquare size={18} className="text-neutral-600 shrink-0" />,
				},
			],
		},
		{
			id: 'danger',
			ariaLabel: 'space-danger',
			items: [
				{
					key: 'DELETE_SPACE',
					title: 'Удалить пространство',
					description: 'Действие необратимо',
					icon: <Trash2 size={18} className="text-red-600 shrink-0" />,
					danger: true,
					onPress: () => onOpenChange(),
				},
			],
		},
	];

	if (isLoading) {
		return (
			<div className="flex min-h-[50dvh] items-center justify-center">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-2xl px-3 pb-16 pt-3 sm:px-6">
			{space && <SpaceInfo space={space} />}

			{sections.map((section) => (
				<section key={section.id} className="mt-4">
					{section.title && (
						<h3 className="px-4 pb-2 text-[11px] font-medium uppercase tracking-wide text-neutral-500">
							{section.title}
						</h3>
					)}

					<Card shadow="none" className="border border-neutral-200 p-1">
						<CardBody className="p-0">
							<Listbox
								onAction={handleAction}
								aria-label={section.ariaLabel}
								selectionMode="none"
								className="p-0"
							>
								{section.items.map((item) => (
									<ListboxItem
										key={item.key}
										onPress={item.onPress}
										className="py-3"
										startContent={item.icon}
										description={item.description}
										endContent={endChevron}
										showDivider={item.showDivider}
										classNames={
											item.danger ? { title: 'text-red-600' } : undefined
										}
									>
										{item.title}
									</ListboxItem>
								))}
							</Listbox>
						</CardBody>
					</Card>
				</section>
			))}

			<DeleteSpaceModal spaceId={spaceId} isOpen={isOpen} onOpenChange={onOpenChange} />
		</div>
	);
};
