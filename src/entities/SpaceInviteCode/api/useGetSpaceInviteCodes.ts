import useSWR from 'swr';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { SpaceInviteCode } from '../model/types';

type Props = {
	spaceId: string;
};

export const useGetSpaceInviteCodes = (props: Props) => {
	const { spaceId } = props;

	const fetcher = async () => {
		const res = await axiosInstance.get<ApiResponse<SpaceInviteCode[]>>(
			`/space-invite-codes/${spaceId}`,
		);
		return res.data.data;
	};

	return useSWR(`/spaces/${spaceId}`, fetcher);
};
