import { axiosInstance, useApiMutation } from 'shared/api';

type Props = {
	chatId: string;
	spaceId: string;
};

export const useRemoveTgChatFromSpace = () => {
	const fetcher = async (props: Props) => {
		const { chatId, spaceId } = props;
		await axiosInstance.delete(`/space-tg-chats/${spaceId}/${chatId}`);
		return true;
	};

	return useApiMutation(fetcher);
};
