import type { ReactNode } from 'react';
import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip } from '@heroui/react';

import type { Space } from '../model/types';

type Props = {
	space: Space;
	actionButtons?: ReactNode;
};

export const SpaceCard = (props: Props) => {
	const { space, actionButtons } = props;

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

			{actionButtons && (
				<CardFooter className="flex items-center justify-between">
					{actionButtons}
				</CardFooter>
			)}
		</Card>
	);
};
