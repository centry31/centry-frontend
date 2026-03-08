import { Button, Card, CardBody, Chip, Modal, ModalContent, Progress } from '@heroui/react';
import { CheckCircle2 } from 'lucide-react';

import { useFirstLoginOnboarding } from '../model/useFirstLoginOnboarding';

type Props = {
	userId?: string;
};

export const FirstLoginOnboarding = (props: Props) => {
	const { userId } = props;

	const {
		flow,
		currentStep,
		step,
		stepsLength,

		progressValue,
		isOpen,
		isLastStep,
		shouldRender,
		isCompletingOnboarding,

		setIsOpen,
		handlePrevStep,
		handleNextStep,
		handleGoToStepAction,
		handleOpenOnboarding,
	} = useFirstLoginOnboarding({ userId });

	if (!shouldRender || !step) return null;

	return (
		<>
			{!isOpen && (
				<div className="fixed inset-x-0 bottom-3 z-40 px-3 sm:bottom-4 sm:px-4">
					<Card className="mx-auto w-full max-w-xl border border-neutral-200 shadow-lg">
						<CardBody className="flex flex-col gap-3">
							<div className="flex items-center justify-between gap-2">
								<div>
									<p className="text-xs uppercase tracking-wide text-primary">
										{flow.eyebrow}
									</p>
									<p className="text-sm text-foreground-600">
										Шаг {currentStep + 1} из {stepsLength}
									</p>
								</div>
								<Button color="primary" size="sm" onPress={handleOpenOnboarding}>
									Продолжить
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
				placement="center"
				className="mx-3"
			>
				<ModalContent>
					<div className="flex flex-col gap-5 p-5 sm:p-6">
						<div className="flex items-start justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-wide text-primary">
									{flow.eyebrow}
								</p>
								<h2 className="mt-1 text-xl font-semibold">{flow.title}</h2>
								<p className="mt-2 text-sm text-foreground-600">
									{flow.description}
								</p>
							</div>

							<Chip variant="flat" color="primary" size="sm">
								{currentStep + 1}/{stepsLength}
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

						<div className="flex flex-col gap-2">
							<div className="flex flex-wrap justify-end gap-2">
								{currentStep > 0 && (
									<Button
										variant="flat"
										onPress={handlePrevStep}
										className="w-full sm:w-auto mr-auto"
										isDisabled={isCompletingOnboarding}
									>
										Назад
									</Button>
								)}

								{step.path && step.cta && (
									<Button
										variant="flat"
										onPress={handleGoToStepAction}
										className="w-full max-w-full whitespace-normal sm:w-auto"
										isDisabled={isCompletingOnboarding}
									>
										{step.cta}
									</Button>
								)}

								<Button
									color="primary"
									endContent={isLastStep ? <CheckCircle2 size={16} /> : undefined}
									onPress={handleNextStep}
									className="w-full sm:w-auto"
									isDisabled={isCompletingOnboarding}
									isLoading={isCompletingOnboarding && isLastStep}
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
