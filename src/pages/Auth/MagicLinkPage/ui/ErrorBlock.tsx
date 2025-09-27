import { useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';
import { TriangleAlert } from 'lucide-react';

type Props = {
	message: string;
	onRetry: () => void;
};

export const ErrorBlock = (props: Props) => {
	const { message, onRetry } = props;

	const navigate = useNavigate();

	const handleNavigateToLoginPage = () => {
		navigate('/login');
	};

	return (
		<div className="rounded-xl border border-red-200 bg-red-50 p-3">
			<div className="flex items-start gap-3">
				<div className="grid h-9 w-9 place-items-center rounded-lg bg-red-100 text-red-700">
					<TriangleAlert size={18} />
				</div>

				<div className="flex-1">
					<div className="text-sm font-medium">Не удалось войти</div>
					<div className="text-sm text-red-700">{message}</div>

					<div className="mt-2 flex gap-2">
						<Button size="sm" variant="flat" onPress={onRetry}>
							Повторить
						</Button>

						<Button size="sm" variant="light" onPress={handleNavigateToLoginPage}>
							Другой способ
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
