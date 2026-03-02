import { useCallback } from 'react';

import { useGetSpaceTgChats, useRemoveTgChatFromSpace } from 'entities/SpaceTgChat';

import { notifySuccess } from 'shared/lib';

type Props = {
	spaceId: string;
	chatId: string;
};

export const useRemoveTgChatFromSpaceForm = (props: Props) => {
	const { spaceId, chatId } = props;

	const { mutate: mutateChats } = useGetSpaceTgChats({ spaceId });
	const { request: removeChat, isLoading } = useRemoveTgChatFromSpace();

	const handleRemoveTgChat = useCallback(async () => {
		const result = await removeChat({ spaceId, chatId });
		if (!result) return;

		mutateChats();
		notifySuccess('Telegram-чат отвязан');
	}, [chatId, mutateChats, removeChat, spaceId]);

	return {
		isLoading,
		handleRemoveTgChat,
	};
};
