import type { ReactNode } from 'react';

type Props = {
	icon: ReactNode;
	label: string;
};

export const TabTitle = (props: Props) => {
	const { icon, label } = props;

	return (
		<div className="flex items-center gap-2 text-sm">
			{icon}

			<span>{label}</span>
		</div>
	);
};
