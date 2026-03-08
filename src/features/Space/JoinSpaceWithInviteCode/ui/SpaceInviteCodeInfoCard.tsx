import { useEffect, useMemo, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, CardBody, CardHeader, Chip, Divider, Spinner } from '@heroui/react';
import { ArrowRight, CheckCircle2, CircleAlert, Users } from 'lucide-react';

import type { Space } from 'entities/Space';
import { useGetUserSpaces, useJoinSpaceWithInviteCode } from 'entities/Space';
import { useGetSpaceInviteCodeInfo } from 'entities/SpaceInviteCode';
import { useGetSpaceMembers } from 'entities/SpaceMember';

import { RoutesPaths } from 'shared/configs';
import { FIRST_LOGIN_ONBOARDING_SOURCE_SESSION_STORAGE_KEY } from 'shared/const';
import { notifySuccess, setLastSelectedSpaceId, useGetParamFromUrl } from 'shared/lib';

// TODO: refactoring
export const SpaceInviteCodeInfoCard = () => {
	const [spaceInfo, setSpaceInfo] = useState<Space>();

	const navigate = useNavigate();

	const { param: code } = useGetParamFromUrl({ name: 'code' });

	const { request: getSpaceInfo, isLoading: isLoadingSpaceInfo } = useGetSpaceInviteCodeInfo();
	const { request: joinSpace, isLoading: isJoining } = useJoinSpaceWithInviteCode();
	const { data: userSpaces = [], mutate: mutateSpaces } = useGetUserSpaces();
	const { data: spaceMembers = [], mutate: mutateSpaceMembers } = useGetSpaceMembers({
		spaceId: spaceInfo?.id || '',
	});

	useEffect(() => {
		if (!code) return;
		void getSpaceInfo({ code }).then((space) => setSpaceInfo(space));
	}, [code, getSpaceInfo]);

	const spaceDetailsPath = useMemo(() => {
		if (!spaceInfo) return RoutesPaths.spaces;
		return generatePath(RoutesPaths.spaceDetails, { spaceId: spaceInfo.id });
	}, [spaceInfo]);

	const isAlreadyMember = useMemo(() => {
		if (!spaceInfo) return false;
		return userSpaces.some((space) => space.id === spaceInfo.id);
	}, [spaceInfo, userSpaces]);

	const handleOpenSpace = () => {
		if (!spaceInfo) return;
		setLastSelectedSpaceId(spaceInfo.id);
		navigate(spaceDetailsPath);
	};

	const handleJoin = async () => {
		if (!code || !spaceInfo || isAlreadyMember) return;

		const result = await joinSpace({ code });
		if (result === undefined) return;

		setLastSelectedSpaceId(spaceInfo.id);
		sessionStorage.setItem(FIRST_LOGIN_ONBOARDING_SOURCE_SESSION_STORAGE_KEY, 'invite');
		await mutateSpaces();
		await mutateSpaceMembers();

		notifySuccess('Вы присоединились к пространству');
		navigate(spaceDetailsPath);
	};

	if (!code) {
		return (
			<Card className="w-full max-w-[430px] border border-neutral-200 shadow-sm">
				<CardHeader className="flex items-start gap-3">
					<div className="rounded-xl bg-warning-50 p-2 text-warning-700">
						<CircleAlert size={18} />
					</div>

					<div>
						<h1 className="text-lg font-semibold">Ссылка приглашения неполная</h1>
						<p className="text-sm text-neutral-600">
							В URL отсутствует код приглашения. Проверьте ссылку и попробуйте снова.
						</p>
					</div>
				</CardHeader>

				<CardBody>
					<Button color="primary" onPress={() => navigate(RoutesPaths.spaces)}>
						Перейти к пространствам
					</Button>
				</CardBody>
			</Card>
		);
	}

	if (isLoadingSpaceInfo && !spaceInfo) {
		return (
			<Card className="w-full max-w-[430px] border border-neutral-200 shadow-sm">
				<CardBody className="flex min-h-[220px] items-center justify-center gap-3 text-neutral-600">
					<Spinner />
					<span>Проверяем приглашение...</span>
				</CardBody>
			</Card>
		);
	}

	if (!isLoadingSpaceInfo && !spaceInfo) {
		return (
			<Card className="w-full max-w-[430px] border border-neutral-200 shadow-sm">
				<CardHeader className="flex items-start gap-3">
					<div className="rounded-xl bg-warning-50 p-2 text-warning-700">
						<CircleAlert size={18} />
					</div>

					<div>
						<h1 className="text-lg font-semibold">Приглашение недействительно</h1>
						<p className="text-sm text-neutral-600">
							Срок действия ссылки мог закончиться или код уже удалён.
						</p>
					</div>
				</CardHeader>

				<CardBody>
					<Button color="primary" onPress={() => navigate(RoutesPaths.spaces)}>
						Перейти к пространствам
					</Button>
				</CardBody>
			</Card>
		);
	}

	return (
		<Card className="w-full max-w-[430px] border border-neutral-200 shadow-sm">
			<CardHeader className="flex flex-col items-center gap-3 text-center">
				<Avatar size="lg" name={spaceInfo?.name} className="bg-neutral-100 text-lg" />

				<div>
					<h1 className="text-xl font-semibold">{spaceInfo?.name}</h1>
					<p className="text-sm text-neutral-500">{spaceInfo?.description}</p>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-2">
					<Chip
						size="sm"
						variant="flat"
						className="text-neutral-700"
						startContent={<Users size={14} />}
					>
						<span className="leading-none">{spaceMembers.length} участников</span>
					</Chip>

					{isAlreadyMember && (
						<Chip
							size="sm"
							color="success"
							variant="flat"
							startContent={<CheckCircle2 size={14} />}
						>
							<span className="leading-none">Вы уже в пространстве</span>
						</Chip>
					)}
				</div>
			</CardHeader>

			<Divider />

			<CardBody className="flex flex-col gap-2">
				{isAlreadyMember ? (
					<>
						<Button
							fullWidth
							color="primary"
							endContent={<ArrowRight size={16} />}
							onPress={handleOpenSpace}
						>
							Открыть пространство
						</Button>

						<Button
							fullWidth
							variant="flat"
							onPress={() => navigate(RoutesPaths.spaces)}
						>
							К списку пространств
						</Button>
					</>
				) : (
					<Button color="primary" onPress={handleJoin} isLoading={isJoining} fullWidth>
						Присоединиться
					</Button>
				)}
			</CardBody>
		</Card>
	);
};
