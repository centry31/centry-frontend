import { useState } from 'react';

import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';

type Props = {
	spaceId: string;
};

export const useLeaveSpace = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const request = async (props: Props) => {
		const { spaceId } = props;

		setIsLoading(true);
		setError('');

		try {
			await axiosInstance.delete<ApiResponse<null>>(`/spaces/leave/${spaceId}`);
		} catch (error) {
			const errorMessage = getApiResponseErrorMessage(error);
			setError(errorMessage);
			throw error;
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
