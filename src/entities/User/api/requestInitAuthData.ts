import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { User } from '../model/types/user';

export const requestInitAuthData = async () => {
	const response = await axiosInstance.get<ApiResponse<User>>('/auth/init');
	return response.data.data;
};
