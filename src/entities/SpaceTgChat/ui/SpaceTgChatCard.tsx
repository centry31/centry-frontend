import { type ReactNode } from 'react';
import { Avatar, Card, CardBody, CardHeader } from '@heroui/react';

import type { SpaceTgChat } from '../model/types';

type Props = { chat: SpaceTgChat; actionsSlot?: ReactNode };

export const SpaceTgChatCard = (props: Props) => {
	const { chat, actionsSlot } = props;

	return (
		<Card shadow="none" className="border border-neutral-200">
			<CardHeader className="flex items-start justify-between gap-2">
				<Avatar name={chat.chatTitle} />

				{actionsSlot}
			</CardHeader>

			<CardBody className={'pt-0'}>
				<h3 className="truncate text-base font-medium">
					{chat.chatTitle || 'Без названия'}
				</h3>
			</CardBody>
		</Card>
	);
};
