import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

type Props = {
	name: string;
};

export const useGetParamFromUrl = (props: Props) => {
	const { name } = props;

	const [searchParams] = useSearchParams();
	const location = useLocation();

	const paramFromQuery = searchParams.get(name);

	const paramFromHash = useMemo(() => {
		if (!location.hash) return null;

		const searchParams = new URLSearchParams(location.hash.replace(/^#/, ''));
		return searchParams.get(name);
	}, [location.hash, name]);

	const param = paramFromQuery ?? paramFromHash;
	return { param };
};
