import {
	FIRST_LOGIN_ONBOARDING_SOURCE_SESSION_STORAGE_KEY,
	FIRST_LOGIN_ONBOARDING_STEP_KEY,
} from 'shared/const';

import type { FirstLoginOnboardingSource } from '../model/types';

const hasWindow = typeof window !== 'undefined';

const getOnboardingStepKey = (userId: string) => `${FIRST_LOGIN_ONBOARDING_STEP_KEY}:${userId}`;

export const readStoredOnboardingStep = (props: { userId: string; stepsLength: number }) => {
	const { userId, stepsLength } = props;

	if (!hasWindow) return 0;

	const storedStepRaw = localStorage.getItem(getOnboardingStepKey(userId));
	const storedStep = Number.parseInt(storedStepRaw || '0', 10);
	const safeStep =
		Number.isNaN(storedStep) || storedStep < 0 || storedStep >= stepsLength ? 0 : storedStep;

	return safeStep;
};

export const saveStoredOnboardingStep = (props: { userId?: string; step: number }) => {
	const { userId, step } = props;

	if (!hasWindow || !userId) return;
	localStorage.setItem(getOnboardingStepKey(userId), String(step));
};

export const clearStoredOnboardingStep = (userId?: string) => {
	if (!hasWindow || !userId) return;
	localStorage.removeItem(getOnboardingStepKey(userId));
};

/**
 * Источник нужен, чтобы после успешного вступления по invite-потоку
 * показать пользователю релевантные шаги (не "создай пространство", а "что делать внутри").
 */
export const getFirstLoginOnboardingSource = (): FirstLoginOnboardingSource => {
	if (!hasWindow) return 'default';
	const source = sessionStorage.getItem(FIRST_LOGIN_ONBOARDING_SOURCE_SESSION_STORAGE_KEY);
	return source === 'invite' ? 'invite' : 'default';
};

export const clearFirstLoginOnboardingSource = () => {
	if (!hasWindow) return;
	sessionStorage.removeItem(FIRST_LOGIN_ONBOARDING_SOURCE_SESSION_STORAGE_KEY);
};
