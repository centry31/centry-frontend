import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { SpaceTgChat } from '../model/types';

type Props = {
	chatId: string;
	spaceId: string;
};

export const useRemoveTgChatFromSpace = () => {
	const fetcher = async (props: Props) => {
		const { chatId, spaceId } = props;
		const response = await axiosInstance.delete<ApiResponse<SpaceTgChat>>(
			`/space-tg-chats/${spaceId}/remove/${chatId}`,
		);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
