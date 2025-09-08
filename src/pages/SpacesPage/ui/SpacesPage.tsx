import { useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';

import { SpacesList } from 'widgets/SpacesList';

export const SpacesPage = () => {
	const navigate = useNavigate();

	const handleOpenCreateSpacePage = () => {
		navigate('/spaces/create');
	};

	return (
		<div className="mx-auto max-w-6xl px-3 py-4 sm:px-6 sm:py-6">
			<div className="mb-4 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold">Мои пространства</h1>
					<p className="mt-1 text-sm text-neutral-600">
						Управляй учебными группами и их календарями.
					</p>
				</div>

				<Button color="primary" onPress={handleOpenCreateSpacePage}>
					Создать
				</Button>
			</div>

			<SpacesList />
		</div>
	);
};
