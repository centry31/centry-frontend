import { axiosInstance, useApiMutation } from 'shared/api';

type Props = {
	spaceId: string;
	name: string;
	description?: string;
};

export const useUpdateSpaceInfo = () => {
	const fetcher = async (props: Props) => {
		const { spaceId, ...payload } = props;
		await axiosInstance.patch(`/spaces/${spaceId}`, payload);
		return true;
	};

	return useApiMutation(fetcher);
};
