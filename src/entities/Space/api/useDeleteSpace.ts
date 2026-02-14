import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { Space } from '../model/types';

type Props = {
	spaceId: string;
};

export const useDeleteSpace = () => {
	const fetcher = async (props: Props) => {
		const { spaceId } = props;
		const response = await axiosInstance.delete<ApiResponse<Space>>(`/spaces/${spaceId}`);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
