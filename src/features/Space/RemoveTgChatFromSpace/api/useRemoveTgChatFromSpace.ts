import { useState } from 'react';

import type { SpaceTgChat } from 'entities/SpaceTgChat';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

type Props = {
	chatId: string;
	spaceId: string;
};

export const useRemoveTgChatFromSpace = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const request = async (props: Props) => {
		const { chatId, spaceId } = props;

		setIsLoading(true);
		setError('');

		try {
			const response = await axiosInstance.delete<ApiResponse<SpaceTgChat>>(
				`/space-tg-chats/${spaceId}/remove/${chatId}`,
			);
			return response.data.data;
		} catch (error) {
			// TODO: add error handler (https://uniteam31.atlassian.net/browse/US-8)
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		request,
		isLoading,
		error,
	};
};
