import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, CardBody, CardHeader, Divider, Spinner } from '@heroui/react';
import { Users } from 'lucide-react';

import type { Space } from 'entities/Space';
import { useGetSpaceMembers } from 'entities/Space';

import { useGetParamFromUrl } from 'shared/lib';

import { useGetSpaceInviteInfo } from '../api/useGetSpaceInviteInfo';
import { useJoinSpace } from '../api/useJoinSpace';

export const SpaceInviteCard = () => {
	const [spaceInfo, setSpaceInfo] = useState<Space>();

	const navigate = useNavigate();

	const { param: code } = useGetParamFromUrl({ name: 'code' });

	const { request: getSpaceInfo, isLoading: isLoadingSpaceInfo } = useGetSpaceInviteInfo();
	const { request: joinSpace, isLoading: isJoining } = useJoinSpace();
	const { data: spaceMembers } = useGetSpaceMembers({ spaceId: spaceInfo?.id || '' });

	useEffect(() => {
		if (!code) return;
		getSpaceInfo({ code }).then((space) => setSpaceInfo(space));
	}, [code]);

	const handleJoin = () => {
		if (!code) return;
		joinSpace({ code }).then(() => navigate(`/spaces/${spaceInfo?.id}`));
	};

	if (isLoadingSpaceInfo || isJoining) {
		return (
			<div className="flex h-full items-center justify-center">
				<Spinner size="lg" />
			</div>
		);
	}

	if (!isLoadingSpaceInfo && !spaceInfo) {
		return (
			<div className="flex h-full items-center justify-center text-neutral-500">
				Ссылка недействительна
			</div>
		);
	}

	return (
		<Card className="w-full sm:w-[400px] border border-neutral-200 shadow-sm">
			<CardHeader className="flex flex-col items-center gap-3 text-center">
				<Avatar size="lg" name={spaceInfo?.name} className="bg-neutral-100 text-lg" />

				<div>
					<h1 className="text-xl font-semibold">{spaceInfo?.name}</h1>
					<p className="text-sm text-neutral-500">{spaceInfo?.description}</p>
				</div>
			</CardHeader>

			<Divider />

			<CardBody className="flex flex-col items-center gap-4">
				<div className="flex items-center gap-1 text-sm text-neutral-600">
					<Users size={16} /> {spaceMembers?.length} участников
				</div>

				<Button color="primary" onPress={handleJoin} isLoading={isJoining} fullWidth>
					Присоединиться
				</Button>
			</CardBody>
		</Card>
	);
};
