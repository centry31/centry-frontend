import useSWR from 'swr';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { BmstuGroup } from '../model/types';

type Props = {
	search?: string;
};

export const useGetBmstuGroups = (props: Props = {}) => {
	const { search } = props;

	const fetcher = () =>
		axiosInstance
			.get<ApiResponse<BmstuGroup[]>>('/bmstu/groups', {
				params: {
					search,
				},
			})
			.then((res) => res.data.data);

	return useSWR(`/bmstu/groups-${search}`, fetcher);
};
