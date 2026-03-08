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

	const fetcher = async () => {
		const res = await axiosInstance.get<ApiResponse<SpaceMember[]>>(
			`/space-members/${spaceId}`,
		);
		return res.data.data;
	};

	const key = spaceId ? `api/spaces/members/${spaceId}` : null;
	return useSWR(key, fetcher);
};
