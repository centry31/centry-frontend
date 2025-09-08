import { Card, CardBody, CardHeader, Chip, Input } from '@heroui/react';

import { SpaceMembersList } from 'widgets/SpaceMembersList';

import { useGetSpaceMembers } from 'entities/Space';

type Props = {
	spaceId: string;
};

// TODO: refactoring
export const MembersTab = (props: Props) => {
	const { spaceId } = props;

	const { data: members, isLoading } = useGetSpaceMembers({ spaceId });

	return (
		<div className="mt-2">
			<Card className="border border-neutral-200">
				<CardHeader className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-2">
						<h3 className="text-base font-medium">Участники</h3>

						<Chip size="sm" variant="flat">
							{members?.length ?? '-'}
						</Chip>
					</div>

					{/* TODO: add handler */}
					<div className="flex w-full max-w-md items-center gap-2 sm:w-auto">
						<Input placeholder="Поиск по имени или @username" />
					</div>
				</CardHeader>

				<CardBody className="p-0">
					<SpaceMembersList members={members || []} isLoading={isLoading} />
				</CardBody>
			</Card>
		</div>
	);
};
