import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, useDisclosure } from '@heroui/react';
import { Info } from 'lucide-react';

import { CreateSpaceTgLinkCodeModal } from 'features/CreateSpaceTgLinkCode';

export const OverviewTab = () => {
	const { isOpen, onOpenChange } = useDisclosure();
	const { spaceId = '' } = useParams();

	const handleSpaceTgLinkCodeModal = () => {
		onOpenChange();
	};

	return (
		<div className="mt-2 grid grid-cols-1 gap-3 lg:grid-cols-2">
			<Card className="border border-neutral-200">
				<CardHeader>
					<h3 className="text-base font-medium">Быстрые действия</h3>
				</CardHeader>

				<CardBody className="flex flex-wrap gap-2">
					<Button variant="flat" color={'primary'} onPress={handleSpaceTgLinkCodeModal}>
						Привязать к Telegram
					</Button>
					<Button variant="flat">Пригласить участника</Button>

					<CreateSpaceTgLinkCodeModal
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						spaceId={spaceId}
					/>
				</CardBody>
			</Card>

			<Card className="border border-neutral-200">
				<CardHeader>
					<h3 className="text-base font-medium">Справка</h3>
				</CardHeader>

				<CardBody>
					<div className="flex items-start gap-2 text-sm text-neutral-600">
						<Info size={16} className="mt-0.5" />

						<p>Здесь краткое описание как пользоваться пространством.</p>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};
