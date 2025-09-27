import useSWR from 'swr';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { SpaceTgChat } from '../model/types';

type Props = {
	spaceId: string;
};

export const useGetSpaceTgChats = (props: Props) => {
	const { spaceId } = props;

	const fetcher = () =>
		axiosInstance
			.get<ApiResponse<SpaceTgChat[]>>(`/space-tg-chats/${spaceId}`)
			.then((res) => res.data.data);

	const { data, isLoading, error, mutate } = useSWR(`/space-tg-chats/${spaceId}`, fetcher);

	return {
		data,
		mutate,
		isLoading,
		error,
	};
};
