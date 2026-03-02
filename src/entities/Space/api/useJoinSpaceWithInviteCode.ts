import { axiosInstance, useApiMutation } from 'shared/api';

type Payload = {
	code: string;
};

export const useJoinSpaceWithInviteCode = () => {
	const fetcher = async (payload: Payload) => {
		await axiosInstance.post('/space-invite-codes/accept', payload);
		return true;
	};

	return useApiMutation(fetcher);
};
