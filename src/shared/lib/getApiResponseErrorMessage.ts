import axios from 'axios';

import type { ApiResponse } from '../types';

/** Достает сообщение из ответа от api */
export const getApiResponseErrorMessage = (error: unknown) => {
	if (!axios.isAxiosError(error)) {
		return 'Произошла неизвестная ошибка';
	}

	const response = error.response?.data as ApiResponse<null>;
	return response.message;
};
