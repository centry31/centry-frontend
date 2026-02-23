import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Chip,
	Code,
	Divider,
	Progress,
	Spacer,
} from '@heroui/react';
import { ArrowRight, Link as LinkIcon } from 'lucide-react';

import { useLoginWithMagicLink } from 'entities/User';

import { RoutesPaths } from 'shared/configs';
import { useGetParamFromUrl } from 'shared/lib';

import { EmptyStateNoCode } from './EmptyStateNoCode';
import { ErrorBlock } from './ErrorBlock';
import { HelpBlock } from './HelpBlock';
import { SuccessBlock } from './SuccessBlock';

const REDIRECT_IN_SECONDS = 3;

export const MagicLinkPage = () => {
	const [redirectIn, setRedirectIn] = useState<number>(REDIRECT_IN_SECONDS); // секунды до редиректа после успеха

	const navigate = useNavigate();
	const { param: code } = useGetParamFromUrl({ name: 'code' });

	const { request: loginWithMagicLink, isLoading, error } = useLoginWithMagicLink();

	const handleRedirectAfterLogin = () => {
		const interval = setInterval(() => setRedirectIn((prev) => prev - 1), 1000);

		const to = setTimeout(() => {
			navigate(RoutesPaths.spaces);
		}, 3000);

		// TODO: memory leak! fix (https://uniteam31.atlassian.net/browse/US-14)
		return () => {
			clearInterval(interval);
			clearTimeout(to);
		};
	};

	const handleRetryLogin = () => {
		window.location.reload();
	};

	useEffect(() => {
		if (!code) return;

		loginWithMagicLink({ code }).then(handleRedirectAfterLogin);
	}, [code]);

	return (
		<div className="m-auto h-full flex max-w-md items-center justify-center px-4 py-6">
			<Card className="w-full border border-neutral-200 shadow-sm">
				<CardHeader className="flex items-center gap-3">
					<div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-100">
						<LinkIcon size={18} />
					</div>

					<div>
						<h1 className="text-lg font-semibold">Вход через ссылку</h1>
						<p className="text-sm text-neutral-500">
							Быстрый вход без пароля через одноразовый код
						</p>
					</div>
				</CardHeader>

				<Divider />

				<CardBody className="space-y-4">
					{!code && (
						<div className="space-y-4">
							<EmptyStateNoCode />
							<Divider />
							<HelpBlock />
						</div>
					)}

					{code && (
						<>
							<Chip
								size="sm"
								variant="flat"
								color="default"
								className="uppercase tracking-wide"
							>
								code
							</Chip>
							<Code className="rounded-lg px-3 py-2 truncate">{code}</Code>

							{isLoading && (
								<div className="space-y-3">
									<Progress isIndeterminate aria-label="Авторизация..." />

									<p className="text-sm text-neutral-600">
										Подтверждаем вашу ссылку и выполняем вход…
									</p>
								</div>
							)}

							{!isLoading && !error && <SuccessBlock redirectIn={redirectIn} />}

							{error && <ErrorBlock message={error} onRetry={handleRetryLogin} />}

							<Spacer y={2} />

							<div className="flex items-center justify-between gap-2">
								<Button variant="flat" onPress={() => navigate('/')}>
									На главную
								</Button>

								<Button
									color="primary"
									endContent={<ArrowRight size={16} />}
									onPress={() => navigate(RoutesPaths.spaces)}
									isDisabled={Boolean(error)}
								>
									Перейти в приложение
								</Button>
							</div>

							<Divider />

							<HelpBlock minimal />
						</>
					)}
				</CardBody>
			</Card>
		</div>
	);
};
