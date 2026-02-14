import { useCallback } from 'react';

import { useGetSpaceTgChats, useRemoveTgChatFromSpace } from 'entities/SpaceTgChat';

type Props = {
	spaceId: string;
	chatId: string;
};

export const useRemoveTgChatFromSpaceForm = (props: Props) => {
	const { spaceId, chatId } = props;

	const { mutate: mutateChats } = useGetSpaceTgChats({ spaceId });
	const { request: removeChat, isLoading } = useRemoveTgChatFromSpace();

	const handleRemoveTgChat = useCallback(async () => {
		const removedChat = await removeChat({ spaceId, chatId });
		if (!removedChat) return;
		mutateChats();
	}, [chatId, mutateChats, removeChat, spaceId]);

	return {
		isLoading,
		handleRemoveTgChat,
	};
};
