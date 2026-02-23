import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

type Props = {
	spaceId: string;
};

export const useCreateTgLinkCode = () => {
	const fetcher = async (props: Props) => {
		const { spaceId } = props;
		const response = await axiosInstance.post<ApiResponse<string>>(
			`/space-tg-chat-links/${spaceId}/create`,
		);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
