import { useState } from 'react';

import type { SpaceInviteCode } from 'entities/SpaceInviteCode';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

type Props = {
	spaceId: string;
	code: string;
};

export const useDeleteSpaceInviteCode = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const request = async (props: Props) => {
		const { spaceId, code } = props;

		setIsLoading(true);
		setError('');

		try {
			const response = await axiosInstance.delete<ApiResponse<SpaceInviteCode>>(
				`/space-invite-codes/${spaceId}/delete/${code}`,
			);
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
