import useSWR from 'swr';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { Space } from '../model/types';

type Props = {
	spaceId: string;
};

/**
 * Получает информацию о пространстве по id
 * */
export const useGetSpace = (props: Props) => {
	const { spaceId } = props;

	const fetcher = async () => {
		const res = await axiosInstance.get<ApiResponse<Space>>(`/spaces/${spaceId}`);
		return res.data.data;
	};

	return useSWR(`api/spaces/${spaceId}`, fetcher);
};
