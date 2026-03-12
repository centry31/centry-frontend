import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Chip, Divider } from '@heroui/react';
import { ArrowRight, Globe, Link2, MessageCircle } from 'lucide-react';

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

	if (!inviteCode) {
		const fallbackPath = authData ? RoutesPaths.spaces : RoutesPaths.welcome;

		return (
			<div className="mx-auto flex h-full w-full max-w-md items-center justify-center px-4 py-8">
				<Card className="w-full border border-neutral-200 shadow-sm">
					<CardHeader className="flex flex-col items-start gap-3">
						<Chip size="sm" variant="flat" color="warning">
							Ошибка ссылки
						</Chip>

						<div className="space-y-1">
							<h1 className="text-xl font-semibold">Приглашение не найдено</h1>
							<p className="text-sm text-neutral-600">
								В ссылке отсутствует код приглашения. Проверьте ссылку и откройте её
								ещё раз.
							</p>
						</div>
					</CardHeader>

					<Divider />

					<CardBody>
						<Button
							fullWidth
							color="primary"
							endContent={<ArrowRight size={16} />}
							onPress={() => navigate(fallbackPath)}
						>
							Вернуться в приложение
						</Button>
					</CardBody>
				</Card>
			</div>
		);
	}

	return (
		<div className="mx-auto flex h-full w-full max-w-md items-center justify-center px-4 py-8">
			<Card className="w-full border border-neutral-200 shadow-sm">
				<CardHeader className="flex flex-col items-start gap-3">
					<Chip size="sm" variant="flat">
						Приглашение в пространство
					</Chip>

					<div className="space-y-1">
						<h1 className="text-xl font-semibold">Вы почти внутри</h1>
						<p className="text-sm text-neutral-600">
							Продолжайте там, где вам удобнее. После входа нужно будет подтвердить
							вступление в пространство.
						</p>
					</div>
				</CardHeader>

				<Divider />

				<CardBody className="space-y-3">
					<Button
						fullWidth
						color="primary"
						startContent={<Globe size={16} />}
						endContent={<ArrowRight size={16} />}
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

					<div className="rounded-xl border border-neutral-200 bg-content2 p-3 text-xs text-neutral-600">
						<div className="mb-1 flex items-center gap-2 text-neutral-700">
							<Link2 size={14} />
							Что дальше
						</div>
						<p>1. Войдите через Telegram.</p>
						<p>2. Откроется карточка пространства.</p>
						<p>3. Нажмите «Присоединиться».</p>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};
