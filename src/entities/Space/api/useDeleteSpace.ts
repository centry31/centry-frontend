import { axiosInstance, useApiMutation } from 'shared/api';

type Props = {
	spaceId: string;
};

export const useDeleteSpace = () => {
	const fetcher = async (props: Props) => {
		const { spaceId } = props;
		await axiosInstance.delete(`/spaces/${spaceId}`);
		return true;
	};

	return useApiMutation(fetcher);
};
