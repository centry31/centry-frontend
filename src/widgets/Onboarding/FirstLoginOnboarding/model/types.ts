import type { LucideIcon } from 'lucide-react';

export type FirstLoginOnboardingSource = 'default' | 'invite';

export type FirstLoginOnboardingStep = {
	title: string;
	description: string;
	Icon: LucideIcon;
	cta?: string;
	path?: string;
};

export type FirstLoginOnboardingFlow = {
	eyebrow: string;
	title: string;
	description: string;
	steps: FirstLoginOnboardingStep[];
};
