import { axiosInstance, useApiMutation } from 'shared/api';

type Props = {
	spaceId: string;
	code: string;
};

export const useDeleteSpaceInviteCode = () => {
	const fetcher = async (props: Props) => {
		const { spaceId, code } = props;
		await axiosInstance.delete(`/space-invite-codes/${spaceId}/delete/${code}`);
		return true;
	};

	return useApiMutation(fetcher);
};
