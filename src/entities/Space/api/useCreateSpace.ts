import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { Space } from '../model/types';

type Props = {
	name: string;
	description?: string;
};

export const useCreateSpace = () => {
	const fetcher = async (props: Props) => {
		const res = await axiosInstance.post<ApiResponse<Space>>('/spaces', props);
		return res.data.data;
	};

	return useApiMutation(fetcher);
};
