import { Navigate } from 'react-router-dom';

import { TelegramLoginButton } from 'features/LoginWithTelegram';

import { useUserStore } from 'entities/User';

// TODO: declare and use from .evn file
const MOCKED_BOT_NAME = 'unishare_test_v1_bot';

export const LoginPage = () => {
	const { authData } = useUserStore();

	if (authData) {
		return <Navigate to={'/calendar'} />;
	}

	return <TelegramLoginButton botName={MOCKED_BOT_NAME} />;
};
