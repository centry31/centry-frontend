import { create } from 'zustand';

import { axiosInstance } from 'shared/api';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const';
import { CurrentSpaceIdController } from 'shared/lib';
import type { ApiResponse } from 'shared/types';

import type { User } from '../types/user';

type Data = {
	authData?: User;
	isInit?: boolean;
};
type Methods = {
	setAuthData: (authData: User) => void;
	initAuthData: () => void;
	logout: () => void;
};
type Store = Data & Methods;

export const useUserStore = create<Store>((set) => ({
	setAuthData: (authData) => {
		set({ authData });
	},

	initAuthData: async () => {
		try {
			const response = await axiosInstance.get<ApiResponse<User>>('/auth/init');
			const authData = response.data.data;

			if (!authData) {
				throw new Error('Что-то пошло не так...');
			}

			const savedSpaceId = CurrentSpaceIdController.getSavedSpaceId();

			if (savedSpaceId) {
				CurrentSpaceIdController.setCurrentSpaceId(savedSpaceId);
			}

			set({ authData });
		} catch (error) {
			// TODO: add notifications
			console.error(`Something went wrong: ${error}`);
		}

		set({ isInit: true });
	},

	logout: () => {
		CurrentSpaceIdController.clearCurrentSpaceId();
		localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);

		set({ authData: undefined });
	},
}));
