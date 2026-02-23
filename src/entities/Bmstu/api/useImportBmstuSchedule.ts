import { axiosInstance, useApiMutation } from 'shared/api';

type Props = {
	spaceId: string;
	groupId: string;
};

export const useImportBmstuSchedule = () => {
	const fetcher = async (props: Props) => {
		const { spaceId, groupId } = props;
		await axiosInstance.post(`/events/${spaceId}/bmstu-import/${groupId}`);
		return true;
	};

	return useApiMutation(fetcher);
};
