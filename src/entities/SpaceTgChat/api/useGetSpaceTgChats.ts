import useSWR from 'swr';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { SpaceTgChat } from '../model/types';

type Props = {
	spaceId: string;
};

export const useGetSpaceTgChats = (props: Props) => {
	const { spaceId } = props;

	const fetcher = async () => {
		const res = await axiosInstance.get<ApiResponse<SpaceTgChat[]>>(
			`/space-tg-chats/${spaceId}`,
		);
		return res.data.data;
	};

	return useSWR(`/space-tg-chats/${spaceId}`, fetcher);
};
