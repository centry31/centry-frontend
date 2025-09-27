import { useState } from 'react';

import type { Space } from 'entities/Space';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

type Props = {
	spaceId: string;
};

export const useDeleteSpace = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const request = async (Props: Props) => {
		const { spaceId } = Props;

		setIsLoading(true);
		setError('');

		try {
			const response = await axiosInstance.delete<ApiResponse<Space>>(`/spaces/${spaceId}`);
			return response.data.data;
		} catch (error) {
			// TODO: add error handler (https://uniteam31.atlassian.net/browse/US-8)
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		request,
		isLoading,
		error,
	};
};
