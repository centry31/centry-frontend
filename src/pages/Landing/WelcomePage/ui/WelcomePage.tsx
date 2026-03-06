import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Chip, Link } from '@heroui/react';
import {
	ArrowRight,
	Bell,
	Calendar,
	CheckCircle2,
	GraduationCap,
	Link2,
	Users,
} from 'lucide-react';

import { useUserStore } from 'entities/User';

import { RoutesPaths } from 'shared/configs';

import { FeatureCard } from './FeatureCard';
import { WelcomeFooter } from './WelcomeFooter';
import { WelcomeNavbar } from './WelcomeNavbar';

const TG_BOT_NAME = __TG_BOT_NAME__;

export const WelcomePage = () => {
	const { authData } = useUserStore();
	const navigate = useNavigate();

	const handleNavigateToLoginPage = () => {
		navigate(RoutesPaths.loginWithTelegram);
	};

	const handleNavigateToTelegram = () => {
		const path = `https://t.me/${TG_BOT_NAME}`;
		window.open(path, '_blank');
	};

	if (authData) {
		return <Navigate to={RoutesPaths.spaces} />;
	}

	return (
		<div className="min-h-dvh bg-white text-black antialiased">
			<WelcomeNavbar />

			<section className="relative isolate overflow-hidden">
				<div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f6f8ff_0%,rgba(255,255,255,0)_62%)]" />
				<div className="pointer-events-none absolute inset-x-0 top-[-170px] -z-10 mx-auto h-[420px] w-[920px] rounded-full bg-[radial-gradient(circle,rgba(145,176,255,0.30)_0%,rgba(255,255,255,0)_70%)] blur-2xl" />

				<div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-8 sm:pt-28 lg:px-8">
					<div className="mx-auto max-w-3xl text-center">
						<Chip
							variant="flat"
							className="mb-5 border border-neutral-200 bg-white text-neutral-700 shadow-sm"
						>
							Alpha
						</Chip>

						<h1 className="text-4xl font-semibold tracking-tight text-black sm:text-6xl">
							Календарь,
							<br className="hidden sm:block" /> который наводит порядок в чате.
						</h1>

						<p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
							Centry собирает встречи, пары и дедлайны в одном пространстве. Вместо
							хаоса в сообщениях - единый календарь и напоминания в Telegram.
						</p>

						<div className="mt-6 flex flex-wrap items-center justify-center gap-2">
							<Chip
								variant="flat"
								className="border border-neutral-200 bg-white text-neutral-700 shadow-sm"
							>
								Команды
							</Chip>
							<Chip
								variant="flat"
								className="border border-neutral-200 bg-white text-neutral-700 shadow-sm"
							>
								Студенты и кураторы
							</Chip>
							<Chip
								variant="flat"
								className="border border-neutral-200 bg-white text-neutral-700 shadow-sm"
							>
								Веб + Telegram
							</Chip>
						</div>

						<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<Button
								color="primary"
								radius="full"
								size="lg"
								onPress={handleNavigateToLoginPage}
								endContent={<ArrowRight size={18} />}
							>
								Войти через Telegram
							</Button>

							<Button
								color="primary"
								radius="full"
								size="lg"
								variant="flat"
								onPress={handleNavigateToTelegram}
								endContent={<ArrowRight size={18} />}
							>
								Перейти в Telegram Bot
							</Button>

							<Button as={Link} href="#why" variant="flat" radius="full" size="lg">
								Зачем это нужно
							</Button>
						</div>
					</div>

					<div className="mt-14">
						<Card
							shadow="sm"
							radius="lg"
							className="mx-auto max-w-6xl border border-white/70 bg-white/80 backdrop-blur"
						>
							<CardBody className="grid gap-3 p-3 sm:grid-cols-3">
								<img src="/calendar.png" />

								<img src="/event.png" />

								<img src="/spaces.png" />
							</CardBody>
						</Card>
					</div>
				</div>
			</section>

			<section id="why" className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8">
				<div className="mb-6 text-center">
					<h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
						Зачем это нужно вам?
					</h2>
					<p className="mx-auto mt-3 max-w-2xl text-neutral-600">
						Основная проблема учебных групп и команд: важные даты разбросаны по
						сообщениям. Centry сводит все в один понятный сценарий.
					</p>
				</div>

				<div className="grid gap-4 md:grid-cols-3">
					<Card shadow="sm" radius="lg" className="border border-white/80 bg-white/90">
						<CardBody className="p-6">
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
								Проблема
							</p>
							<h3 className="mt-2 text-lg font-semibold text-neutral-900">
								Информация тонет в чате
							</h3>
							<p className="mt-2 text-sm leading-6 text-neutral-600">
								Пары и дедлайны отправляют в разное время, а потом их сложно найти
								перед занятием.
							</p>
						</CardBody>
					</Card>

					<Card shadow="sm" radius="lg" className="border border-white/80 bg-white/90">
						<CardBody className="p-6">
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
								Решение
							</p>
							<h3 className="mt-2 text-lg font-semibold text-neutral-900">
								Одно пространство на группу
							</h3>
							<p className="mt-2 text-sm leading-6 text-neutral-600">
								Создаете пространство, добавляете события, приглашаете участников по
								ссылке.
							</p>
						</CardBody>
					</Card>

					<Card shadow="sm" radius="lg" className="border border-white/80 bg-white/90">
						<CardBody className="p-6">
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
								Результат
							</p>
							<h3 className="mt-2 text-lg font-semibold text-neutral-900">
								Все понимают, что и когда
							</h3>
							<p className="mt-2 text-sm leading-6 text-neutral-600">
								Участники видят актуальный план в календаре и получают напоминания в
								Telegram.
							</p>
						</CardBody>
					</Card>
				</div>
			</section>

			<section id="about" className="mx-auto max-w-7xl px-4 py-4 sm:py-8 lg:px-8">
				<Card shadow="sm" radius="lg" className="border border-neutral-200 bg-white/90">
					<CardBody className="p-6 sm:p-8">
						<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
							<div>
								<h2 className="text-2xl font-semibold sm:text-3xl">
									Что перед вами прямо сейчас
								</h2>
								<p className="mt-3 max-w-2xl text-neutral-600">
									Это не концепт и не презентация. Это рабочая alpha-версия: можно
									зайти, создать пространство и вести календарь команды.
								</p>
							</div>

							<div className="flex flex-wrap gap-2">
								<Chip variant="flat">Alpha</Chip>
								<Chip variant="flat">Вход через Telegram</Chip>
								<Chip variant="flat">Web + Mini App</Chip>
							</div>
						</div>
					</CardBody>
				</Card>
			</section>

			<section id="features" className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8">
				<h2 className="mb-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
					Что уже работает?
				</h2>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<FeatureCard
						icon={<Calendar className="h-5 w-5" />}
						title="Общий календарь пространства"
					>
						События по дням, неделям и месяцам. Можно создавать, редактировать и удалять
						записи.
					</FeatureCard>

					<FeatureCard icon={<Bell className="h-5 w-5" />} title="Напоминания в Telegram">
						Если пространство привязано к Telegram-чату, участники получают уведомления
						по событиям.
					</FeatureCard>

					<FeatureCard icon={<Users className="h-5 w-5" />} title="Пространства групп">
						У каждой группы свой контур: участники, роли, настройки и отдельный
						календарь.
					</FeatureCard>

					<FeatureCard icon={<Link2 className="h-5 w-5" />} title="Приглашения по ссылке">
						Вступление в пространство по invite-коду через браузер или Telegram Mini
						App.
					</FeatureCard>

					<FeatureCard
						icon={<GraduationCap className="h-5 w-5" />}
						title="Импорт расписания Бауманки"
					>
						Эксклюзивно для групп МГТУ им. Баумана: импорт расписания в пространство с
						дальнейшей работой в календаре.
					</FeatureCard>
				</div>
			</section>

			<section id="alpha" className="mx-auto max-w-7xl px-4 pb-16 sm:pb-24 lg:px-8">
				<Card
					radius="lg"
					shadow="sm"
					className="overflow-hidden border border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]"
				>
					<CardBody className="p-8 sm:p-12">
						<div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<Chip variant="flat" className="mb-3">
									Alpha-статус
								</Chip>

								<h3 className="text-2xl font-semibold">
									Продукт развивается итерациями
								</h3>
								<p className="mt-2 max-w-xl text-neutral-600">
									Интерфейс и отдельные сценарии могут меняться по мере обратной
									связи от команд, которые уже используют сервис.
								</p>

								<div className="mt-4 flex flex-wrap gap-2 text-sm text-neutral-700">
									<span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1">
										<CheckCircle2 size={14} /> Вход за минуту через Telegram
									</span>
								</div>
							</div>

							<div className="flex flex-wrap gap-3">
								<Button
									color="primary"
									radius="full"
									endContent={<ArrowRight size={18} />}
									onPress={handleNavigateToLoginPage}
								>
									Войти через Telegram
								</Button>

								<Button as={Link} href="#features" radius="full" variant="flat">
									Посмотреть функции
								</Button>
							</div>
						</div>
					</CardBody>
				</Card>
			</section>

			<WelcomeFooter />
		</div>
	);
};
