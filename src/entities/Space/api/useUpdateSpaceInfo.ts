import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { Space } from '../model/types';

type Props = {
	spaceId: string;
	name: string;
	description?: string;
};

export const useUpdateSpaceInfo = () => {
	const fetcher = async (props: Props) => {
		const { spaceId, ...payload } = props;
		const response = await axiosInstance.patch<ApiResponse<Space>>(
			`/spaces/${spaceId}`,
			payload,
		);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
