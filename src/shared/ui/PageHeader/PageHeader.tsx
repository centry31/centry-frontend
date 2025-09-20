import { type ReactNode } from 'react';

interface Props {
	title: string;
	description?: ReactNode;
}

export const PageHeader = (props: Props) => {
	const { title, description } = props;

	return (
		<header>
			<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
			{description && (
				<p className="mt-1 max-w-prose text-sm text-neutral-500 sm:text-base">
					{description}
				</p>
			)}
		</header>
	);
};
