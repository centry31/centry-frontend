import { useParams } from 'react-router-dom';
import { Card, CardBody, Spinner } from '@heroui/react';
import { Link2 } from 'lucide-react';

import type { SpaceInviteCode } from 'entities/SpaceInviteCode';
import { SpaceInviteCodeCard } from 'entities/SpaceInviteCode';

import { SpaceInviteCodesActionsList } from './SpaceInviteCodesActionsList';

type Props = {
	inviteLinks: SpaceInviteCode[];
	isLoading?: boolean;
};

export const SpaceInviteCodesList = (props: Props) => {
	const { inviteLinks, isLoading } = props;

	const { spaceId = ' ' } = useParams();

	if (isLoading)
		return (
			<div className="flex justify-center py-8">
				<Spinner />
			</div>
		);

	if (!inviteLinks?.length) {
		return (
			<Card shadow="none" className="border border-neutral-200">
				<CardBody className="flex flex-col items-center gap-2 py-8 text-center">
					<div className="rounded-2xl bg-neutral-100 p-3">
						<Link2 size={20} className="text-neutral-600" />
					</div>

					<h4 className="text-sm font-medium">Пока нет приглашений</h4>

					<p className="max-w-[28rem] text-xs text-neutral-500">
						Создайте ссылку-приглашение, чтобы пользователи могли быстро вступать в
						пространство.
					</p>
				</CardBody>
			</Card>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
			{inviteLinks.map((invite) => (
				<SpaceInviteCodeCard
					key={invite.code}
					invite={invite}
					actionsSlot={
						<SpaceInviteCodesActionsList spaceId={spaceId} code={invite.code} />
					}
				/>
			))}
		</div>
	);
};
