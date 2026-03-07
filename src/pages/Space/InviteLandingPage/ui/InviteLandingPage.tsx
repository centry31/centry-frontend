import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Chip, Divider } from '@heroui/react';
import { Globe, MessageCircle } from 'lucide-react';

import { useUserStore } from 'entities/User';

import { RoutesPaths } from 'shared/configs';
import { PENDING_AUTH_REDIRECT_LINK_SESSION_STORAGE_KEY } from 'shared/const';
import { encodeTelegramStartParam, useGetParamFromUrl } from 'shared/lib';

const TG_BOT_NAME = __TG_BOT_NAME__;

export const InviteLandingPage = () => {
	const navigate = useNavigate();
	const { authData } = useUserStore();

	const { param: code } = useGetParamFromUrl({ name: 'code' });
	const inviteCode = code || '';

	const joinPath = useMemo(
		() => `${RoutesPaths.joinSpaceWithInviteCode}?code=${inviteCode}`,
		[inviteCode],
	);

	const telegramMiniAppLink = useMemo(() => {
		const startParam = encodeTelegramStartParam(joinPath);
		return `https://t.me/${TG_BOT_NAME}?startapp=${startParam}`;
	}, [joinPath]);

	const savePendingRedirectIfNeeded = () => {
		if (authData) return;
		sessionStorage.setItem(PENDING_AUTH_REDIRECT_LINK_SESSION_STORAGE_KEY, joinPath);
	};

	const handleContinueInWeb = () => {
		savePendingRedirectIfNeeded();
		navigate(joinPath);
	};

	const handleOpenMiniApp = () => {
		savePendingRedirectIfNeeded();
		window.location.href = telegramMiniAppLink;
	};

	return (
		<div className="mx-auto flex h-full w-full max-w-md items-center justify-center px-4 py-8">
			<Card className="w-full border border-neutral-200 shadow-sm">
				<CardHeader className="flex flex-col items-start gap-3">
					<Chip size="sm" variant="flat">
						Приглашение
					</Chip>

					<div className="space-y-1">
						<h1 className="text-xl font-semibold">
							Вы открыли приглашение в пространство!
						</h1>
						<p className="text-sm text-neutral-600">
							Выберите, где продолжить: в браузере или через Telegram.
						</p>
					</div>
				</CardHeader>

				<Divider />

				<CardBody className="space-y-3">
					<Button
						fullWidth
						color="primary"
						startContent={<Globe size={16} />}
						onPress={handleContinueInWeb}
					>
						Продолжить в браузере
					</Button>

					<Button
						fullWidth
						color="primary"
						variant="flat"
						startContent={<MessageCircle size={16} />}
						onPress={handleOpenMiniApp}
					>
						Открыть в Telegram Mini App
					</Button>
				</CardBody>
			</Card>
		</div>
	);
};
