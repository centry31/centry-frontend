import { useState } from 'react';

import type { Space, UpdateSpace } from 'entities/Space';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

type Payload = {
	spaceId: string;
	space: UpdateSpace;
};

export const useUpdateSpaceInfo = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const request = async (payload: Payload) => {
		const { spaceId, space } = payload;

		setIsLoading(true);
		setError('');

		try {
			const response = await axiosInstance.patch<ApiResponse<Space>>(
				`/spaces/${spaceId}`,
				space,
			);
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
