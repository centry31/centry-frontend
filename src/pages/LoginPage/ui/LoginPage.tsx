import { Navigate } from 'react-router-dom';

import { Login } from 'features/Login';

import { useUserStore } from 'entities/User';

export const LoginPage = () => {
	const { authData } = useUserStore();

	if (authData) {
		return <Navigate to={'/calendar'} />;
	}

	return <Login />;
};
