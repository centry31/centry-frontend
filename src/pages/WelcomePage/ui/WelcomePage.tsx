import { Navigate } from 'react-router-dom';

import { useUserStore } from 'entities/User';

export const WelcomePage = () => {
	const { authData } = useUserStore();

	if (authData) {
		return <Navigate to={'/calendar'} />;
	}

	return <div>Welcome page</div>;
};
