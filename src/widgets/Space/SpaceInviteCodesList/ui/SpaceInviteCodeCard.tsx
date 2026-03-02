import type { ReactNode } from 'react';
import { Card, CardBody, CardHeader, Progress, Snippet } from '@heroui/react';
import { ClockIcon, Link2Icon, UsersIcon } from 'lucide-react';

import type { SpaceInviteCode } from 'entities/SpaceInviteCode';
import { getSpaceInviteLinkUrl } from 'entities/SpaceInviteCode';

type Props = {
	invite: SpaceInviteCode;
	actions?: ReactNode;
};

export const SpaceInviteCodeCard = (props: Props) => {
	const { invite, actions } = props;

	const used = invite.usedCount ?? 0;
	const max = invite.maxUses ?? 0;
	const pct = max > 0 ? Math.min(100, Math.round((invite.usedCount / invite.maxUses) * 100)) : 0;

	const expiresAt = new Date(invite.expiresAt).toLocaleString();
	const codeUrl = getSpaceInviteLinkUrl(invite.code);

	return (
		<Card shadow="none" className="border border-neutral-200">
			<CardHeader className="flex items-start gap-3">
				<div className="mt-0.5 rounded-xl bg-neutral-100 p-2">
					<Link2Icon size={18} className="text-neutral-700" />
				</div>

				<div className="min-w-0 flex-1">
					<div className="flex flex-wrap items-center gap-1.5">
						<h3 className="truncate text-base font-medium">Код-приглашение</h3>
					</div>

					<div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
						<span className="inline-flex items-center gap-1">
							<UsersIcon size={14} /> Использовано: {used}/{max}
						</span>

						<span className="inline-flex items-center gap-1">
							<ClockIcon size={14} /> Истекает: {expiresAt}
						</span>
					</div>
				</div>

				{actions}
			</CardHeader>

			<CardBody className="pt-0">
				<div className="space-y-2">
					<Progress
						aria-label="Использования"
						value={pct}
						classNames={{
							base: 'h-2',
						}}
					/>

					<div className="flex items-center justify-between text-xs text-neutral-500">
						<span>Осталось: {max > used ? max - used : 0}</span>
						<span>{pct}%</span>
					</div>

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
