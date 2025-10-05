import React from 'react';
import { Card, CardBody, CardHeader, Chip, Snippet } from '@heroui/react';

import { CopyButton, ShareButton } from 'shared/ui';

type Props = {
	linkUrl: string;
};

export const SpaceInviteCodeResult = (props: Props) => {
	const { linkUrl } = props;

	return (
		<Card className="border border-neutral-200">
			<CardHeader>
				<div className="flex items-center gap-2">
					<h3 className="text-base font-medium">Ссылка создана</h3>
				</div>
			</CardHeader>

			<CardBody className="flex flex-col gap-3">
				<div className="space-y-1">
					<Snippet
						classNames={{
							pre: 'whitespace-pre-wrap break-all',
						}}
					>
						{linkUrl}
					</Snippet>
				</div>

				<div className="flex flex-wrap gap-2 pt-1">
					<CopyButton text={linkUrl} />
					<ShareButton title={'Приглашение в пространство'} url={linkUrl} />
				</div>
			</CardBody>
		</Card>
	);
};
