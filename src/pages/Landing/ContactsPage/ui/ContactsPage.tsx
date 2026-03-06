import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Chip, Link } from '@heroui/react';
import { ArrowLeft, ArrowUpRight, MessageCircle } from 'lucide-react';

import { RoutesPaths } from 'shared/configs';

const TELEGRAM_LINK = 'https://t.me/def1s0';
const TELEGRAM_HANDLE = '@def1s0';
const CONTACT_NAME = 'Daniil';

export const ContactsPage = () => {
	const navigate = useNavigate();

	return (
		<div
			className="min-h-dvh bg-[#f5f5f7] text-black antialiased"
			style={{
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", sans-serif',
			}}
		>
			<section className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10">
				<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(56,132,255,0.16),rgba(245,245,247,0)_48%)]" />

				<Card
					shadow="sm"
					radius="lg"
					className="w-full max-w-2xl border border-white/80 bg-white/90 backdrop-blur-xl"
				>
					<CardBody className="p-6 sm:p-10">
						<div className="mb-8 flex items-start justify-between gap-4">
							<div>
								<Chip
									variant="flat"
									className="border border-neutral-200 bg-white text-neutral-700"
								>
									Связь
								</Chip>
								<h1 className="mt-4 text-4xl font-semibold tracking-tight text-black sm:text-5xl">
									{CONTACT_NAME}
								</h1>
								<p className="mt-2 text-base text-neutral-600">
									Личный контакт для связи по проекту.
								</p>
							</div>

							<div className="grid h-11 w-11 place-items-center rounded-2xl border border-neutral-200 bg-white text-neutral-700">
								<MessageCircle size={20} />
							</div>
						</div>

						<div className="rounded-3xl border border-neutral-200 bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)] p-5 sm:p-6">
							<p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
								Telegram
							</p>
							<Link
								isExternal
								href={TELEGRAM_LINK}
								showAnchorIcon={false}
								className="mt-2 inline-flex items-center gap-2 text-2xl font-semibold tracking-tight text-black hover:opacity-75 sm:text-3xl"
							>
								{TELEGRAM_HANDLE}
								<ArrowUpRight size={20} />
							</Link>
							<p className="mt-2 text-sm text-neutral-500">
								{CONTACT_NAME} • {TELEGRAM_HANDLE}
							</p>
						</div>

						<div className="mt-8 flex flex-wrap gap-3">
							<Button
								color="primary"
								radius="full"
								as={Link}
								href={TELEGRAM_LINK}
								isExternal
								endContent={<ArrowUpRight size={16} />}
							>
								Написать в Telegram
							</Button>

							<Button
								variant="flat"
								radius="full"
								startContent={<ArrowLeft size={16} />}
								onPress={() => navigate(RoutesPaths.welcome)}
							>
								На главную
							</Button>
						</div>
					</CardBody>
				</Card>
			</section>
		</div>
	);
};
