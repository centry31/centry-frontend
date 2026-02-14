import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { SpaceInviteCode } from '../model/types';

type Props = {
	spaceId: string;
	code: string;
};

export const useDeleteSpaceInviteCode = () => {
	const fetcher = async (props: Props) => {
		const { spaceId, code } = props;
		const response = await axiosInstance.delete<ApiResponse<SpaceInviteCode>>(
			`/space-invite-codes/${spaceId}/delete/${code}`,
		);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
