import useSWR from 'swr';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { Space } from '../model/types';

/**
 * Получает конкретные пространства, в которых пользователь состоит.
 * */
export const useGetUserSpaces = () => {
	const fetcher = async () => {
		const res = await axiosInstance.get<ApiResponse<Space[]>>('/spaces');
		return res.data.data;
	};

	return useSWR('api/spaces', fetcher);
};
