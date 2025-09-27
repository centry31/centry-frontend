import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Chip, Link } from '@heroui/react';
import { ArrowRight, Bell, Calendar, ShieldCheck, Smartphone, Sparkles, Users } from 'lucide-react';

import { useUserStore } from 'entities/User';

import { RoutesPaths } from 'shared/configs';

import { FeatureCard } from './FeatureCard';
import { WelcomeFooter } from './WelcomeFooter';
import { WelcomeNavbar } from './WelcomeNavbar';

export const WelcomePage = () => {
	const { authData } = useUserStore();

	const navigate = useNavigate();

	const handleNavigateToLoginPage = () => {
		navigate(RoutesPaths.loginWithTelegram);
	};

	if (authData) {
		return <Navigate to={'/calendar'} />;
	}

	return (
		<div className="min-h-dvh bg-white text-black antialiased">
			<WelcomeNavbar />

			<section className="relative overflow-hidden">
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(0,0,0,0.06),rgba(255,255,255,0))]" />

				<div className="mx-auto max-w-7xl px-4 pt-20 pb-4 sm:pt-28 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<Chip color="default" variant="flat" className="mb-4">
							Alpha • Бесплатно для студентов
						</Chip>

						<h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
							Делай важное.{' '}
							<span className="bg-gradient-to-r from-black to-neutral-500 bg-clip-text text-transparent">
								Мы напомним.
							</span>
						</h1>

						<p className="mt-6 text-base leading-7 text-neutral-600 sm:text-lg">
							Универсальный календарь для учебных групп: пространства, напоминания в
							Telegram и мобильный интерфейс. Всё просто, без перегруза.
						</p>

						<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<Button
								as={Link}
								href="#try"
								color="primary"
								radius="full"
								size="lg"
								endContent={<ArrowRight size={18} />}
							>
								Попробовать бесплатно
							</Button>

							<Button as={Link} href="#how" variant="flat" radius="full" size="lg">
								Как это работает
							</Button>
						</div>
					</div>

					{/* Mock hero visual */}
					<div className="mt-14">
						<Card
							shadow="sm"
							radius="lg"
							className="mx-auto max-w-5xl border border-neutral-200"
						>
							<CardBody className="p-0">
								<div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-50">
									{/* Replace src with your actual screenshot */}
									<div className="flex h-full w-full items-center justify-center">
										<div className="flex flex-col items-center gap-3 text-neutral-400">
											<Smartphone size={28} />

											<p className="text-sm">
												Здесь будет скриншот мобильного календаря
											</p>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</section>

			{/* Value props */}
			<section id="how" className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<FeatureCard
						icon={<Calendar className="h-5 w-5" />}
						title="Мобильный календарь"
					>
						Сосредоточен на списке и дне. Быстрое добавление. Без лишних кликов.
					</FeatureCard>

					<FeatureCard icon={<Bell className="h-5 w-5" />} title="Напоминания в Telegram">
						Пресеты: за 15 минут, за час, за день. Точно в нужный момент.
					</FeatureCard>

					<FeatureCard icon={<Users className="h-5 w-5" />} title="Пространства групп">
						Разные календари для разных предметов или команд. Приглашения по ссылке.
					</FeatureCard>

					<FeatureCard
						icon={<ShieldCheck className="h-5 w-5" />}
						title="Приватность по умолчанию"
					>
						Данные ваших групп видят только участники. Без лишних прав.
					</FeatureCard>

					<FeatureCard icon={<Sparkles className="h-5 w-5" />} title="Простой интерфейс">
						Чистая типографика, быстрые действия, фокус на задаче.
					</FeatureCard>

					<FeatureCard
						icon={<Smartphone className="h-5 w-5" />}
						title="Работает в Telegram Mini App"
					>
						Открывай прямо из чата — без паролей и лишних входов.
					</FeatureCard>
				</div>
			</section>

			{/* Split section */}
			<section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8">
				<div className="grid items-center gap-8 lg:grid-cols-2">
					<div>
						<h2 className="text-2xl font-semibold sm:text-3xl">
							Групповой календарь, который правда пользуют
						</h2>

						<p className="mt-4 text-neutral-600">
							В Bauman‑style сценариях расписание часто живёт в голове и чатах. Мы
							приводим его в порядок: одно место, единые правила уведомлений, и
							минимум усилий со стороны участников.
						</p>

						<div className="mt-6 flex flex-wrap gap-3">
							<Chip variant="flat">Создание событий за 3 клика</Chip>
							<Chip variant="flat">Роли: владелец и участники</Chip>
							<Chip variant="flat">Синхронизация времени</Chip>
						</div>

						<div className="mt-8 flex gap-3" id="try">
							<Button color="primary" radius="sm">
								Открыть в Telegram
							</Button>

							<Button variant="flat" radius="sm">
								Открыть веб‑версию
							</Button>
						</div>
					</div>

					<Card shadow="sm" radius="lg" className="border border-neutral-200">
						<CardHeader className="pb-0">
							<h3 className="text-lg font-medium">Список на сегодня</h3>
						</CardHeader>

						<CardBody>
							<div className="h-64 w-full rounded-xl bg-neutral-50" />
						</CardBody>
					</Card>
				</div>
			</section>

			{/* CTA */}
			<section className="relative mx-auto max-w-7xl px-4 pb-16 sm:pb-24 lg:px-8">
				<Card radius="lg" shadow="sm" className="overflow-hidden border border-neutral-200">
					<CardBody className="p-8 sm:p-12">
						<div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<h3 className="text-2xl font-semibold">
									Начни сегодня. Это бесплатно.
								</h3>

								<p className="mt-2 max-w-xl text-neutral-600">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
									perspiciatis.
								</p>
							</div>

							<div className="flex gap-3 flex-wrap">
								<Button
									color="primary"
									endContent={<ArrowRight size={18} />}
									onPress={handleNavigateToLoginPage}
								>
									Войти через Telegram
								</Button>

								<Button variant="flat">Посмотреть демо</Button>
							</div>
						</div>
					</CardBody>
				</Card>
			</section>

			<WelcomeFooter />
		</div>
	);
};
