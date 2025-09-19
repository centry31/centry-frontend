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

	const fetcher = () =>
		axiosInstance.get<ApiResponse<Space>>(`/spaces/${spaceId}`).then((res) => res.data.data);

	const { data, mutate, isLoading, error } = useSWR(`api/spaces/${spaceId}`, fetcher);

	return {
		data,
		mutate,
		isLoading,
		error,
	};
};
