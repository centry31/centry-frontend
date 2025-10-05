import { Avatar, Card, CardBody, CardHeader, Chip, Spinner } from '@heroui/react';
import { Info } from 'lucide-react';

import type { SpaceMember } from 'entities/Space';
import { useUserStore } from 'entities/User';

type Props = {
	members: SpaceMember[];
	isLoading: boolean;
};

export const SpaceMembersList = (props: Props) => {
	const { members, isLoading } = props;
	const { authData } = useUserStore();

	return (
		<Card shadow={'none'} className="border border-neutral-200">
			<CardHeader className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-2">
					<h3 className="text-base font-medium">Участники</h3>

					<Chip size="sm" variant="flat">
						{members?.length ?? '-'}
					</Chip>
				</div>
			</CardHeader>

			<CardBody className="p-0">
				{isLoading && (
					<div className="flex justify-center py-8">
						<Spinner />
					</div>
				)}

				{!isLoading && !members.length && (
					<div className="flex items-center justify-center gap-2 py-10 text-neutral-500">
						<Info size={16} /> Никого не найдено
					</div>
				)}

				<ul className="divide-y divide-neutral-200">
					{members.map((member) => (
						<li
							key={member.id}
							className="flex items-center justify-between gap-3 px-4 py-3"
						>
							<div className="flex items-center gap-3">
								{/* TODO: add avatar url */}
								<Avatar size="sm" name={member.displayName} />

								<div className="leading-tight">
									<div className="text-sm font-medium">{member.displayName}</div>

									{member.username && (
										<div className="text-xs text-neutral-500">
											@{member.username}
										</div>
									)}
								</div>
							</div>

							<div className="flex items-center gap-2">
								{/* TODO: https://uniteam31.atlassian.net/browse/US-17 */}
								{/*{member.id !== authData?.id && (*/}
								{/*	// TODO: add handler*/}
								{/*	<Button size="sm" variant="light" color="danger">*/}
								{/*		Удалить*/}
								{/*	</Button>*/}
								{/*)}*/}

								{member.id === authData?.id && (
									<Chip size="sm" variant="flat" color={'primary'}>
										Это вы
									</Chip>
								)}
							</div>
						</li>
					))}
				</ul>
			</CardBody>
		</Card>
	);
};
