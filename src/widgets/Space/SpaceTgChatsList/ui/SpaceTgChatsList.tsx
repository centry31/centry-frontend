import { Card, CardBody, Spinner } from '@heroui/react';
import { MessageSquare } from 'lucide-react';

import type { SpaceTgChat } from 'entities/SpaceTgChat';

import { SpaceTgChatActionsList } from './SpaceTgCardActionsList';
import { SpaceTgChatCard } from './SpaceTgChatCard';

type Props = {
	spaceId: string;
	tgChats: SpaceTgChat[];
	isLoading?: boolean;
};

export const SpaceTgChatsList = (props: Props) => {
	const { spaceId, tgChats, isLoading } = props;

	if (isLoading)
		return (
			<div className="flex justify-center py-8">
				<Spinner />
			</div>
		);

	if (!isLoading && !tgChats.length) {
		return (
			<Card shadow="none" className="border border-neutral-200">
				<CardBody className="flex flex-col items-center gap-2 py-8 text-center">
					<div className="rounded-2xl bg-neutral-100 p-3">
						<MessageSquare size={20} className="text-neutral-600" />
					</div>

					<h4 className="text-sm font-medium">Пока нет привязанных чатов</h4>

					<p className="max-w-[28rem] text-xs text-neutral-500">
						Подключите Telegram-чат к пространству, чтобы получать уведомления в
						мессенджере
					</p>
				</CardBody>
			</Card>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
			{tgChats.map((chat) => (
				<SpaceTgChatCard
					key={chat.id}
					chat={chat}
					actions={<SpaceTgChatActionsList spaceId={spaceId} chatId={chat.id} />}
				/>
			))}
		</div>
	);
};
