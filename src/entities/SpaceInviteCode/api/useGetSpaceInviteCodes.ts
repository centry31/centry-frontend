import useSWR from 'swr';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { SpaceInviteCode } from '../model/types';

type Props = {
	spaceId: string;
};

export const useGetSpaceInviteCodes = (props: Props) => {
	const { spaceId } = props;

	const fetcher = () =>
		axiosInstance
			.get<ApiResponse<SpaceInviteCode[]>>(`/space-invite-codes/${spaceId}`)
			.then((res) => res.data.data);

	const { data, mutate, isLoading, error } = useSWR(`/spaces/${spaceId}`, fetcher);

	return {
		data,
		mutate,
		isLoading,
		error,
	};
};
