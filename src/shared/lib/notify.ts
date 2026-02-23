import { addToast } from '@heroui/react';

export const notifySuccess = (message: string) => {
	addToast({
		color: 'success',
		title: message,
	});
};

export const notifyError = (message: string) => {
	addToast({
		color: 'danger',
		title: message,
	});
};
