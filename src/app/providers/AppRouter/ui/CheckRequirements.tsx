import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useUserStore } from 'entities/User';

import { RoutesPaths } from 'shared/configs';

type Props = {
	children: ReactNode;
	isAuthRequired?: boolean;
};

export function CheckRequirements(props: Props) {
	const { children, isAuthRequired } = props;

	const { authData } = useUserStore();

	if (isAuthRequired && !authData) return <Navigate to={RoutesPaths.loginWithTelegram} replace />;
	return children;
}
