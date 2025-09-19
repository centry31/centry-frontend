import { Button, Card, CardBody, CardHeader, useDisclosure } from '@heroui/react';

import { DeleteSpaceModal } from 'features/DeleteSpace';

type Props = {
	spaceId: string;
};

export const DangerZone = (props: Props) => {
	const { spaceId } = props;

	const { isOpen, onOpenChange } = useDisclosure();

	return (
		<Card className="border border-neutral-200">
			<CardHeader>
				<h3 className="text-base font-medium text-danger">Опасная зона</h3>
			</CardHeader>

			<CardBody>
				<p className="text-sm text-neutral-600">
					Удаление пространства приведёт к потере всех напоминаний и событий.
				</p>

				<Button className="mt-3" color="danger" variant="flat" onPress={onOpenChange}>
					Удалить пространство
				</Button>
			</CardBody>

			<DeleteSpaceModal spaceId={spaceId} isOpen={isOpen} onOpenChange={onOpenChange} />
		</Card>
	);
};
