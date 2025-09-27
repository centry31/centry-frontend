import type { ReactNode } from 'react';
import { Card, CardBody } from '@heroui/react';

type Props = {
	icon: ReactNode;
	title: string;
	children: ReactNode;
};

export const FeatureCard = (props: Props) => {
	const { icon, title, children } = props;

	return (
		<Card shadow="sm" radius="lg" className="h-full border border-neutral-200">
			<CardBody className="flex items-start gap-4 p-6">
				<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
					{icon}
				</div>

				<div>
					<h3 className="text-base font-medium">{title}</h3>
					<p className="mt-2 text-sm text-neutral-600">{children}</p>
				</div>
			</CardBody>
		</Card>
	);
};
