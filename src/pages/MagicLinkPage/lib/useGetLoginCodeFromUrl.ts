import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export const useGetLoginCodeFromUrl = () => {
	const [searchParams] = useSearchParams();
	const location = useLocation();

	const codeFromQuery = searchParams.get('code');

	const codeFromHash = useMemo(() => {
		if (!location.hash) return null;

		const searchParams = new URLSearchParams(location.hash.replace(/^#/, ''));
		return searchParams.get('code');
	}, [location.hash]);

	const code = codeFromQuery ?? codeFromHash;
	return { code };
};
