import useSWR from 'swr';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { SpaceMember } from '../model/types';

type Props = {
	spaceId: string;
};

/**
 * Получает участников пространства по spaceId.
 * */
export const useGetSpaceMembers = (props: Props) => {
	const { spaceId } = props;

	const fetcher = () =>
		axiosInstance
			.get<ApiResponse<SpaceMember[]>>(`/spaces/users/${spaceId}`)
			.then((res) => res.data.data);

	const { data, mutate, isLoading, error } = useSWR(`api/spaces/members/${spaceId}`, fetcher);

	return {
		data,
		mutate,
		isLoading,
		error,
	};
};
