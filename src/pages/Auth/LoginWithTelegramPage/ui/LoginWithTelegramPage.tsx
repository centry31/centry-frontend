import { Navigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Divider, Link as UiLink, Spacer } from '@heroui/react';
import { ArrowLeft, MessageCircle, Shield } from 'lucide-react';

import { TelegramLoginWidget } from 'features/Auth/LoginWithTelegramWidget';

import { useUserStore } from 'entities/User';

const TG_OAUTH_CLIENT_ID = __TG_OAUTH_CLIENT_ID__;

export const LoginWithTelegramPage = () => {
	const { authData } = useUserStore();

	if (authData) return <Navigate to={'/spaces'} />;

	return (
		<div className="m-auto h-full mt-0 mb-0 flex max-w-md items-center justify-center px-4 py-8">
			<Card className="border border-neutral-200 shadow-sm">
				<CardHeader className="flex items-center gap-3">
					<div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-100">
						<MessageCircle size={18} />
					</div>

					<div>
						<h1 className="text-lg font-semibold">Войти с Telegram</h1>
						<p className="text-sm text-neutral-500">
							Быстрый вход без пароля через ваш Telegram-аккаунт
						</p>
					</div>
				</CardHeader>

				<Divider />

				<CardBody className="space-y-5">
					{/* CTA */}
					<div className="flex flex-col items-center gap-3">
						<TelegramLoginWidget clientId={TG_OAUTH_CLIENT_ID} />

						<p className="text-xs text-neutral-500 text-center">
							После нажатия откроется Telegram OAuth, затем вы вернётесь в приложение.
						</p>
					</div>

					{/* Преимущества / доверие */}
					<div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
						<div className="flex items-start gap-3">
							<div className="grid h-8 w-8 place-items-center rounded-lg bg-neutral-100">
								<Shield size={16} />
							</div>

							<div className="flex-1">
								<div className="text-sm font-medium">Без пароля</div>
								<p className="text-sm text-neutral-600">
									Мы используем официальное API Telegram. Доступ выдаётся только
									на чтение вашего публичного профиля и ID.
								</p>
							</div>
						</div>
					</div>

					{/* Альтернативы / хелп */}
					<div className="text-xs leading-relaxed text-neutral-500">
						<div className="mb-1 font-medium text-neutral-600">Проблемы с входом?</div>

						<ul className="list-disc space-y-1 pl-5">
							<li>
								Убедитесь, что открыли страницу в том же браузере, где авторизован
								Telegram.
							</li>

							<li>
								Если Telegram не открылся, проверьте блокировщик всплывающих окон и
								попробуйте снова.
							</li>

							<li>Если ошибка повторяется, вернитесь на главную и начните вход заново.</li>
						</ul>
					</div>

					<Spacer y={1} />

					{/* Навигация */}
					<div className="flex items-center justify-between">
						<Button
							variant="flat"
							startContent={<ArrowLeft size={16} />}
							onPress={() => history.back()}
						>
							Назад
						</Button>
						<UiLink href="/" color="foreground" className="text-sm">
							На главную
						</UiLink>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};
