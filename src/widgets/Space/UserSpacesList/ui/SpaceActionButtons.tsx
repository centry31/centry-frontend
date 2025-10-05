import { generatePath, useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';
import { ArrowRight, Settings } from 'lucide-react';

import type { Space } from 'entities/Space';

import { RoutesPaths } from 'shared/configs';

type Props = {
	space: Space;
};

export const SpaceActionButtons = (props: Props) => {
	const { space } = props;

	const navigate = useNavigate();

	const handleNavigateDetails = () => {
		const path = generatePath(RoutesPaths.spaceDetails, { spaceId: space.id });
		navigate(path);
	};

	const handleNavigateSettings = () => {
		const path = generatePath(RoutesPaths.spaceSettingsList, { spaceId: space.id });
		navigate(path);
	};

	const isOwner = space.access === 'owner';

	return (
		<>
			<Button
				onPress={handleNavigateDetails}
				variant="flat"
				endContent={<ArrowRight size={16} />}
			>
				Перейти
			</Button>

			{isOwner && (
				<Button
					onPress={handleNavigateSettings}
					variant="flat"
					endContent={<Settings size={16} />}
				>
					Настройки
				</Button>
			)}
		</>
	);
};
