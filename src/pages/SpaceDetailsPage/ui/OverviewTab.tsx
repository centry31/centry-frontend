import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, useDisclosure } from '@heroui/react';
import { Info } from 'lucide-react';

import { CreateSpaceInviteLinkModal } from 'features/CreateSpaceInviteLink';
import { CreateSpaceTgLinkCodeModal } from 'features/CreateSpaceTgLinkCode';

export const OverviewTab = () => {
	const { isOpen: isLinkCodeModal, onOpenChange: onLinkCodeModal } = useDisclosure();
	const { isOpen: isInviteLinkModal, onOpenChange: onInviteLinkModal } = useDisclosure();
	const { spaceId = '' } = useParams();

	const handleLinkCodeModal = () => {
		onLinkCodeModal();
	};

	const handleInviteLinkModal = () => {
		onInviteLinkModal();
	};

	return (
		<div className="mt-2 grid grid-cols-1 gap-3 lg:grid-cols-2">
			<Card className="border border-neutral-200">
				<CardHeader>
					<h3 className="text-base font-medium">Быстрые действия</h3>
				</CardHeader>

				<CardBody className="flex flex-wrap gap-2">
					<Button
						variant="flat"
						color={'primary'}
						onPress={handleLinkCodeModal}
						fullWidth
					>
						Привязать к Telegram
					</Button>
					<Button variant="flat" onPress={handleInviteLinkModal} fullWidth>
						Пригласить участников
					</Button>

					<CreateSpaceTgLinkCodeModal
						isOpen={isLinkCodeModal}
						onOpenChange={handleLinkCodeModal}
						spaceId={spaceId}
					/>

					{isInviteLinkModal && (
						<CreateSpaceInviteLinkModal
							isOpen={isInviteLinkModal}
							onOpenChange={handleInviteLinkModal}
						/>
					)}
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
