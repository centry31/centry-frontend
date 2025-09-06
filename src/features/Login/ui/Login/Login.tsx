import { useTelegramLogin } from '../../api/useTelegramLogin';
import { TelegramLoginButton } from '../TelegramLoginButton/TelegramLoginButton';

export const Login = () => {
	const { request, isLoading, error } = useTelegramLogin();

	return (
		<div>
			<TelegramLoginButton botName={'unishare_test_v1_bot'} onAuthCallback={request} />
		</div>
	);
};
