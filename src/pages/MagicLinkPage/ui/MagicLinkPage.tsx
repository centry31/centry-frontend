import { useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { axiosInstance } from 'shared/api';

export const MagicLinkPage = () => {
	const [searchParams] = useSearchParams();
	const location = useLocation();

	const codeFromQuery = searchParams.get('code');

	const codeFromHash = useMemo(() => {
		if (!location.hash) return null;

		const sp = new URLSearchParams(location.hash.replace(/^#/, ''));
		return sp.get('code');
	}, [location.hash]);

	const code = codeFromQuery ?? codeFromHash;

	useEffect(() => {
		if (!code) return;

		axiosInstance('/auth/magic-link', { method: 'POST', data: { code } })
			.then((res) => console.log({ res }))
			.catch((error) => console.log({ error }));
	}, [code]);

	if (!code) {
		return (
			<div>
				Не найден параметр <code>code</code>
			</div>
		);
	}

	return (
		<div>
			<div>Авторизуем… (code: {code})</div>
		</div>
	);
};
