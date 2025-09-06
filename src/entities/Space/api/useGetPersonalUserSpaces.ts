import useSWR from 'swr';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { Space } from '../model/types';

/**
 * Получает конкретные пространства, в которых пользователь состоит.
 * */
export const useGetPersonalUserSpaces = () => {
	const fetcher = () =>
		axiosInstance.get<ApiResponse<Space[]>>('/spaces').then((res) => res.data.data);

	const { data, mutate, isLoading, error } = useSWR('api/spaces', fetcher);

	return {
		data,
		mutate,
		isLoading,
		error,
	};
};
