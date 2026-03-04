import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Chip, Modal, ModalContent, Progress } from '@heroui/react';
import { CalendarDays, CheckCircle2, PlusCircle, UserPlus } from 'lucide-react';

import { RoutesPaths } from 'shared/configs';
import {
	FIRST_LOGIN_ONBOARDING_COMPLETED_KEY,
	FIRST_LOGIN_ONBOARDING_STEP_KEY,
} from 'shared/const';

type Step = {
	title: string;
	description: string;
	Icon: typeof PlusCircle;

	cta?: string;
	path?: string;
};

const STEPS: Step[] = [
	{
		title: 'Создайте первое пространство',
		description:
			'Это база для вашей группы: участники, события и настройки будут храниться здесь.',
		cta: 'Создать пространство',
		path: RoutesPaths.createSpace,
		Icon: PlusCircle,
	},
	{
		title: 'Или вступите по приглашению',
		description: 'Если пространство уже есть, присоединитесь по ссылке-приглашению.',
		Icon: UserPlus,
	},
	{
		title: 'Перейдите к планированию',
		description: 'После входа в пространство вы сможете вести общее расписание в календаре.',
		cta: 'Открыть пространства',
		path: RoutesPaths.spaces,
		Icon: CalendarDays,
	},
	{
		title: 'Включите Telegram-уведомления',
		description:
			'Чтобы не пропускать события, включите Telegram-уведомления в настройках пространства: Настройки -> Привязанные чаты.',
		Icon: CheckCircle2,
	},
];

const getOnboardingKey = (userId: string) => `${FIRST_LOGIN_ONBOARDING_COMPLETED_KEY}:${userId}`;
const getOnboardingStepKey = (userId: string) => `${FIRST_LOGIN_ONBOARDING_STEP_KEY}:${userId}`;

type Props = {
	userId?: string;
};

export const FirstLoginOnboarding = (props: Props) => {
	const { userId } = props;

	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);

	useEffect(() => {
		if (!userId) {
			setIsOpen(false);
			setIsCompleted(false);
			setCurrentStep(0);
			return;
		}

		const isCompleted = localStorage.getItem(getOnboardingKey(userId)) === '1';
		const storedStepRaw = localStorage.getItem(getOnboardingStepKey(userId));
		const storedStep = Number.parseInt(storedStepRaw || '0', 10);
		const safeStep =
			Number.isNaN(storedStep) || storedStep < 0 || storedStep >= STEPS.length
				? 0
				: storedStep;

		setIsCompleted(isCompleted);
		setIsOpen(!isCompleted);
		setCurrentStep(safeStep);
	}, [userId]);

	const progressValue = useMemo(() => ((currentStep + 1) / STEPS.length) * 100, [currentStep]);

	const markCompleted = () => {
		if (!userId) return;
		localStorage.setItem(getOnboardingKey(userId), '1');
		localStorage.removeItem(getOnboardingStepKey(userId));
		setIsCompleted(true);
	};

	const handleSkip = () => {
		markCompleted();
		setIsOpen(false);
	};

	const handleNextStep = () => {
		if (currentStep >= STEPS.length - 1) {
			markCompleted();
			setIsOpen(false);
			return;
		}

		const nextStep = currentStep + 1;
		if (userId) {
			localStorage.setItem(getOnboardingStepKey(userId), String(nextStep));
		}
		setCurrentStep(nextStep);
	};

	const handleGoToStepAction = () => {
		const step = STEPS[currentStep];
		if (!step.path) return;
		setIsOpen(false);
		navigate(step.path);
	};

	const handleOpenOnboarding = () => {
		if (isCompleted) return;
		setIsOpen(true);
	};

	if (!userId || isCompleted) return null;

	const step = STEPS[currentStep];
	const isLastStep = currentStep === STEPS.length - 1;

	return (
		<>
			{!isOpen && (
				<div className="fixed inset-x-0 bottom-3 z-40 px-3 sm:bottom-4 sm:px-4">
					<Card className="mx-auto w-full max-w-xl border border-neutral-200 shadow-lg">
						<CardBody className="flex flex-col gap-3">
							<div className="flex items-center justify-between gap-2">
								<div>
									<p className="text-xs uppercase tracking-wide text-primary">
										Онбординг
									</p>
									<p className="text-sm text-foreground-600">
										Шаг {currentStep + 1} из {STEPS.length}
									</p>
								</div>
								<Button color="primary" size="sm" onPress={handleOpenOnboarding}>
									Открыть
								</Button>
							</div>
							<Progress
								aria-label="Прогресс онбординга"
								value={progressValue}
								size="sm"
							/>
						</CardBody>
					</Card>
				</div>
			)}

			<Modal
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				isDismissable
				hideCloseButton
				placement="center"
				className="mx-3"
			>
				<ModalContent>
					<div className="flex flex-col gap-5 p-5 sm:p-6">
						<div className="flex items-start justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-wide text-primary">
									Быстрый старт
								</p>
								<h2 className="mt-1 text-xl font-semibold">Первые шаги</h2>
							</div>

							<Chip variant="flat" color="primary" size="sm">
								{currentStep + 1}/{STEPS.length}
							</Chip>
						</div>

						<Progress
							aria-label="Прогресс онбординга"
							value={progressValue}
							size="sm"
						/>

						<div className="rounded-xl border border-neutral-200 bg-content2 p-4">
							<div className="mb-2 flex items-center gap-2 text-primary">
								<step.Icon size={18} />
								<span className="text-sm font-medium">Шаг {currentStep + 1}</span>
							</div>

							<h3 className="text-lg font-semibold">{step.title}</h3>
							<p className="mt-2 text-sm text-foreground-600">{step.description}</p>
						</div>

						<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
							<Button variant="light" onPress={handleSkip}>
								Пропустить
							</Button>

							<div className="flex gap-2">
								{step.path && step.cta && (
									<Button variant="flat" onPress={handleGoToStepAction}>
										{step.cta}
									</Button>
								)}

								<Button
									color="primary"
									endContent={isLastStep ? <CheckCircle2 size={16} /> : undefined}
									onPress={handleNextStep}
								>
									{isLastStep ? 'Завершить' : 'Дальше'}
								</Button>
							</div>
						</div>
					</div>
				</ModalContent>
			</Modal>
		</>
	);
};
