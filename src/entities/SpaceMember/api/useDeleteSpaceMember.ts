import { axiosInstance, useApiMutation } from 'shared/api';

type Props = {
	spaceId: string;
	userId: string;
};

export const useDeleteSpaceMember = () => {
	const fetcher = async (props: Props) => {
		const { spaceId, userId } = props;
		await axiosInstance.delete(`/space-members/delete/${spaceId}/${userId}`);
		return true;
	};

	return useApiMutation(fetcher);
};
