import type { ReactNode } from 'react';
import { Card, CardBody, CardHeader, Snippet } from '@heroui/react';
import { Link2Icon } from 'lucide-react';

import type { SpaceInviteCode } from 'entities/SpaceInviteCode';
import { getSpaceInviteLinkUrl } from 'entities/SpaceInviteCode';

type Props = {
	invite: SpaceInviteCode;
	actions?: ReactNode;
};

export const SpaceInviteCodeCard = (props: Props) => {
	const { invite, actions } = props;

	const codeUrl = getSpaceInviteLinkUrl(invite.code);

	return (
		<Card shadow="none" className="border border-neutral-200">
			<CardHeader className="flex items-start gap-3">
				<div className="mt-0.5 rounded-xl bg-neutral-100 p-2">
					<Link2Icon size={18} className="text-neutral-700" />
				</div>

				<div className="min-w-0 flex-1">
					<div className="flex flex-wrap items-center gap-1.5">
						<h3 className="truncate text-base font-medium">Ссылка-приглашение</h3>
					</div>
				</div>

				{actions}
			</CardHeader>

			<CardBody className="pt-0">
				<div className="space-y-2">
					<Snippet
						size={'sm'}
						classNames={{
							pre: 'whitespace-pre-wrap break-words',
						}}
					>
						{codeUrl}
					</Snippet>
				</div>
			</CardBody>
		</Card>
	);
};
