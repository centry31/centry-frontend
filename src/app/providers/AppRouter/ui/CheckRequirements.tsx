import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useUserStore } from 'entities/User';

import { RoutesPaths } from 'shared/configs';
import { PENDING_AUTH_REDIRECT_LINK_SESSION_STORAGE_KEY } from 'shared/const';

type Props = {
	children: ReactNode;
	isAuthRequired?: boolean;
};

export function CheckRequirements(props: Props) {
	const { children, isAuthRequired } = props;

	const { authData } = useUserStore();
	const location = useLocation();

	if (isAuthRequired && !authData) {
		const authRequiredRedirectPath = `${location.pathname}${location.search}${location.hash}`;
		sessionStorage.setItem(
			PENDING_AUTH_REDIRECT_LINK_SESSION_STORAGE_KEY,
			authRequiredRedirectPath,
		);
		return <Navigate to={RoutesPaths.loginWithTelegram} replace />;
	}

	return children;
}
