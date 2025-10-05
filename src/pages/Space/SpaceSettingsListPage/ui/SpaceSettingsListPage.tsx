import type { ReactNode } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, Listbox, ListboxItem, Spinner, useDisclosure } from '@heroui/react';
import classNames from 'classnames';
import { ChevronRight, Link2, LogOut, MessageSquare, Settings, Trash2, Users } from 'lucide-react';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';

import { DeleteSpaceModal } from 'features/Space/DeleteSpace';
import { LeaveSpaceModal } from 'features/Space/LeaveSpace';

import { useGetSpace } from 'entities/Space';

import type { Path } from 'shared/configs';

type Action = 'DELETE_SPACE' | 'LEAVE_SPACE';

type Item = {
	key: Path | Action;
	title: string;
	description?: string;
	icon: ReactNode;
	danger?: boolean;
	showDivider?: boolean;
	onPress: () => void;
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

	const { isOpen: isDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();
	const { isOpen: isLeaveOpen, onOpenChange: onLeaveOpenChange } = useDisclosure();

	const navigate = useNavigate();

	const endChevron = <ChevronRight size={16} className="text-neutral-300 shrink-0" />;

	const handleNavigate = (path: Path) => {
		const generatedPath = generatePath(path, { spaceId });
		navigate(generatedPath);
	};

	const sections: Section[] = [
		{
			id: 'overview',
			title: 'Обзор',
			ariaLabel: 'space-overview',
			items: [
				{
					key: '/spaces/settings/:spaceId/members',
					onPress: () => handleNavigate('/spaces/settings/:spaceId/members'),
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
					key: '/spaces/settings/:spaceId/settings',
					onPress: () => handleNavigate('/spaces/settings/:spaceId/settings'),
					title: 'Основные настройки',
					description: 'Название, описание, приватность',
					icon: <Settings size={18} className="text-neutral-600 shrink-0" />,
					showDivider: true,
				},
				{
					key: '/spaces/settings/:spaceId/invite-codes',
					onPress: () => handleNavigate('/spaces/settings/:spaceId/invite-codes'),
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
					key: '/spaces/settings/:spaceId/tg-chats',
					onPress: () => handleNavigate('/spaces/settings/:spaceId/tg-chats'),
					title: 'Привязанные чаты',
					description: 'Группы, каналы, синхронизация',
					icon: <MessageSquare size={18} className="text-neutral-600 shrink-0" />,
				},
			],
		},
		{
			id: 'danger',
			title: 'DANGER ZONE',
			ariaLabel: 'space-danger',
			items: [
				{
					key: 'LEAVE_SPACE',
					onPress: onLeaveOpenChange,
					title: 'Выйти из пространства',
					description: 'После выхода доступ будет ограничен',
					icon: <LogOut size={18} className="text-red-600 shrink-0" />,
					danger: true,
					showDivider: true,
				},
				{
					key: 'DELETE_SPACE',
					onPress: onDeleteOpenChange,
					title: 'Удалить пространство',
					description: 'Действие необратимо',
					icon: <Trash2 size={18} className="text-red-600 shrink-0" />,
					danger: true,
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
										classNames={{
											title: classNames(item.danger && 'text-red-600'),
										}}
									>
										{item.title}
									</ListboxItem>
								))}
							</Listbox>
						</CardBody>
					</Card>
				</section>
			))}

			<LeaveSpaceModal
				spaceId={spaceId}
				isOpen={isLeaveOpen}
				onOpenChange={onLeaveOpenChange}
			/>

			<DeleteSpaceModal
				spaceId={spaceId}
				isOpen={isDeleteOpen}
				onOpenChange={onDeleteOpenChange}
			/>
		</div>
	);
};
