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
		<Card
			shadow="sm"
			radius="lg"
			className="h-full border border-white/80 bg-white/90 backdrop-blur"
		>
			<CardBody className="flex items-start gap-4 p-6">
				<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(180deg,#eef2ff_0%,#f5f7ff_100%)] text-neutral-700">
					{icon}
				</div>

				<div>
					<h3 className="text-base font-semibold tracking-tight text-neutral-900">{title}</h3>
					<p className="mt-2 text-sm leading-6 text-neutral-600">{children}</p>
				</div>
			</CardBody>
		</Card>
	);
};
