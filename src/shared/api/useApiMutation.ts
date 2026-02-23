import { useCallback, useState } from 'react';

import { getApiResponseErrorMessage, notifyError } from '../lib';

type RequestFn<TPayload, TResult> = (payload: TPayload) => Promise<TResult>;

type Options = {
	getErrorMessage?: (error: unknown) => string;
	onError?: (error: unknown) => void;
	rethrow?: boolean;
};

export const useApiMutation = <TPayload, TResult>(
	requestFn: RequestFn<TPayload, TResult>,
	options?: Options,
) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const request = useCallback(
		async (payload: TPayload): Promise<TResult | undefined> => {
			setIsLoading(true);
			setError('');

			try {
				return await requestFn(payload);
			} catch (requestError) {
				const errorMessage =
					options?.getErrorMessage?.(requestError) ??
					getApiResponseErrorMessage(requestError);

				setError(errorMessage);
				notifyError(errorMessage);
				options?.onError?.(requestError);

				if (!options?.onError) {
					console.error(requestError);
				}

				if (options?.rethrow) {
					throw requestError;
				}
			} finally {
				setIsLoading(false);
			}
		},
		[options, requestFn],
	);

	return {
		request,
		isLoading,
		error,
	};
};
