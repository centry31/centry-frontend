import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

type Props = {
	spaceId: string;
};

export const useLeaveSpace = () => {
	const fetcher = async (props: Props) => {
		const { spaceId } = props;
		await axiosInstance.delete<ApiResponse<null>>(`/space-members/leave/${spaceId}`);
		return true;
	};

	return useApiMutation(fetcher);
};
