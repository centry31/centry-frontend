import React from 'react';
import { Card, CardBody, CardHeader, Chip, Code } from '@heroui/react';

import { CopyButton, ShareButton } from 'shared/ui';

type Props = {
	linkUrl: string;
};

export const InviteLinkResult = (props: Props) => {
	const { linkUrl } = props;

	return (
		<Card className="border border-neutral-200">
			<CardHeader>
				<div className="flex items-center gap-2">
					<h3 className="text-base font-medium">Ссылка создана</h3>
					<Chip size="sm" variant="flat" color="success" className="uppercase">
						Ready
					</Chip>
				</div>
			</CardHeader>

			<CardBody className="flex flex-col gap-3">
				<div className="space-y-1">
					<div className="text-xs uppercase tracking-wide text-neutral-500">link</div>
					<Code>{linkUrl}</Code>
				</div>

				<div className="flex flex-wrap gap-2 pt-1">
					<CopyButton text={linkUrl} />
					<ShareButton title={'Приглашение в пространство'} url={linkUrl} />
				</div>
			</CardBody>
		</Card>
	);
};
