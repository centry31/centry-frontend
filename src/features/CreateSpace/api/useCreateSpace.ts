import { useState } from 'react';

import type { CreateSpace, Space } from 'entities/Space';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

type Props = {
	space: CreateSpace;
};

export const useCreateSpace = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const request = async (props: Props) => {
		const { space } = props;

		setIsLoading(true);
		setError('');

		try {
			const response = await axiosInstance.post<ApiResponse<Space>>('/spaces', space);
			return response.data.data;
		} catch (error) {
			// TODO: add error handler (https://uniteam31.atlassian.net/browse/US-8)
			console.error({ error });
		} finally {
			setIsLoading(false);
		}
	};

	return { request, isLoading, error };
};
