import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import { Home, TriangleAlert } from 'lucide-react';

import { useUserStore } from 'entities/User';

import { RoutesPaths } from 'shared/configs';

export const NotFoundPage = () => {
	const navigate = useNavigate();
	const { authData } = useUserStore();

	const fallbackPath = authData ? RoutesPaths.spaces : RoutesPaths.welcome;

	return (
		<div className="mx-auto flex h-full w-full max-w-2xl items-center px-3 sm:px-6">
			<Card className="w-full border border-neutral-200 shadow-sm">
				<CardHeader className="flex items-start gap-3">
					<div className="rounded-xl bg-danger-50 p-2 text-danger-700">
						<TriangleAlert size={18} />
					</div>

					<div>
						<h1 className="text-lg font-semibold">Страница не найдена</h1>
						<p className="text-sm text-neutral-600">
							Запрошенный адрес не существует или был перемещен.
						</p>
					</div>
				</CardHeader>

				<CardBody className="flex flex-col gap-2 sm:flex-row">
					<Button
						color="primary"
						startContent={<Home size={16} />}
						onPress={() => navigate(fallbackPath)}
					>
						На главную
					</Button>

					<Button variant="flat" onPress={() => navigate(-1)}>
						Назад
					</Button>
				</CardBody>
			</Card>
		</div>
	);
};
