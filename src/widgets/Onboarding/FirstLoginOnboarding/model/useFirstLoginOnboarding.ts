import { useEffect, useMemo, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import { useGetUserSpaces } from 'entities/Space';
import { useCompleteOnboarding, useUserStore } from 'entities/User';

import { RoutesPaths } from 'shared/configs';
import { resolveSpaceId } from 'shared/lib';

import { buildFirstLoginOnboardingFlow } from '../lib/buildFirstLoginOnboardingFlow';
import {
	clearFirstLoginOnboardingSource,
	clearStoredOnboardingStep,
	getFirstLoginOnboardingSource,
	readStoredOnboardingStep,
	saveStoredOnboardingStep,
} from '../lib/onboardingStorage';
import type { FirstLoginOnboardingStep } from './types';

type Props = {
	userId?: string;
};

export const useFirstLoginOnboarding = (props: Props) => {
	const { userId } = props;

	const navigate = useNavigate();
	const { authData, setAuthData } = useUserStore();
	const { request: completeOnboarding, isLoading: isCompletingOnboarding } =
		useCompleteOnboarding();

	const isWelcomePage = Boolean(useMatch(RoutesPaths.welcome));
	const isInviteLandingPage = Boolean(useMatch(RoutesPaths.inviteLanding));
	const isJoinByInvitePage = Boolean(useMatch(RoutesPaths.joinSpaceWithInviteCode));
	const isOnboardingHiddenRoute = isWelcomePage || isInviteLandingPage || isJoinByInvitePage;

	const { data: userSpaces = [] } = useGetUserSpaces();
	const selectedSpaceId = resolveSpaceId({ spaces: userSpaces });
	const selectedSpaceAccess = userSpaces.find((space) => space.id === selectedSpaceId)?.access;

	const onboardingSource = userId ? getFirstLoginOnboardingSource() : 'default';
	const isCompletedFromServer = Boolean(authData?.isOnboardingCompleted);

	const flow = useMemo(() => {
		return buildFirstLoginOnboardingFlow({
			hasSpaces: userSpaces.length > 0,
			selectedSpaceId,
			selectedSpaceAccess,
			source: onboardingSource,
		});
	}, [onboardingSource, selectedSpaceAccess, selectedSpaceId, userSpaces.length]);

	const steps = flow.steps;

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

		const safeStep = readStoredOnboardingStep({
			userId,
			stepsLength: steps.length,
		});

		setIsCompleted(isCompletedFromServer);
		setIsOpen(!isCompletedFromServer);
		setCurrentStep(safeStep);
	}, [isCompletedFromServer, steps.length, userId]);

	const progressValue = useMemo(() => {
		if (!steps.length) return 0;
		return ((currentStep + 1) / steps.length) * 100;
	}, [currentStep, steps.length]);

	const markCompleted = async () => {
		if (!authData || !userId) return;

		const result = await completeOnboarding(undefined);
		if (result === undefined) return;

		setAuthData({
			...authData,
			isOnboardingCompleted: true,
		});
		clearStoredOnboardingStep(userId);
		clearFirstLoginOnboardingSource();
		setIsCompleted(true);
	};

	const handlePrevStep = () => {
		if (currentStep === 0) return;

		const prevStep = currentStep - 1;
		saveStoredOnboardingStep({ userId, step: prevStep });
		setCurrentStep(prevStep);
	};

	const handleNextStep = async () => {
		if (currentStep >= steps.length - 1) {
			await markCompleted();
			setIsOpen(false);
			return;
		}

		const nextStep = currentStep + 1;
		saveStoredOnboardingStep({ userId, step: nextStep });
		setCurrentStep(nextStep);
	};

	const handleGoToStepAction = () => {
		const currentOnboardingStep = steps[currentStep];
		if (!currentOnboardingStep?.path) return;

		setIsOpen(false);
		navigate(currentOnboardingStep.path);
	};

	const handleOpenOnboarding = () => {
		if (isCompleted || isCompletingOnboarding) return;
		setIsOpen(true);
	};

	const shouldRender =
		!isOnboardingHiddenRoute && Boolean(userId) && !isCompleted && steps.length > 0;
	const step: FirstLoginOnboardingStep | undefined = steps[currentStep];
	const isLastStep = currentStep === steps.length - 1;

	return {
		flow,
		currentStep,
		step,
		stepsLength: steps.length,
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
	};
};
