import { axiosInstance, useApiMutation } from 'shared/api';

export const useCompleteOnboarding = () => {
	const fetcher = async () => {
		await axiosInstance.patch('/users/complete-onboarding');
		return true;
	};

	return useApiMutation(fetcher);
};
