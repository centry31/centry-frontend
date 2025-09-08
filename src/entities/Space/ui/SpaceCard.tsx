import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip } from '@heroui/react';
import { ArrowRight } from 'lucide-react';

import type { Space } from '../model/types';

type Props = {
	space: Space;
	actionsSlot?: ReactNode;
};

export const SpaceCard = (props: Props) => {
	const { space, actionsSlot } = props;

	const navigate = useNavigate();

	const handleOpenSpaceDetails = () => {
		navigate(`/spaces/${space.id}`);
	};

	return (
		<Card className="group border border-neutral-200 transition hover:shadow-md">
			<CardHeader className="flex items-start justify-between gap-2">
				<div>
					<div className="flex items-center gap-2">
						<Avatar
							name={space.name}
							size="sm"
							className="bg-neutral-100 text-neutral-800"
						/>
						<h3 className="text-base font-medium">{space.name}</h3>
					</div>

					{space.description && (
						<p className="mt-1 line-clamp-2 text-sm text-neutral-600">
							{space.description}
						</p>
					)}
				</div>

				{actionsSlot}
			</CardHeader>

			<CardBody>
				<div className="flex flex-wrap items-center gap-2">
					<Chip size="sm" variant="flat">
						Календарь
					</Chip>

					<Chip size="sm" variant="flat">
						Напоминания
					</Chip>
				</div>
			</CardBody>

			<CardFooter className="flex items-center justify-between">
				<Button
					onPress={handleOpenSpaceDetails}
					variant="flat"
					endContent={<ArrowRight size={16} />}
				>
					Открыть
				</Button>
			</CardFooter>
		</Card>
	);
};
