import { Avatar, Button } from '@heroui/react';

import type { Space } from 'entities/Space';

type Props = {
	space: Space;
};

export const Header = (props: Props) => {
	const { space } = props;

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<Avatar name={space.name} className="bg-neutral-100 text-neutral-900" />

				<div>
					<h1 className="text-xl font-semibold">{space.name}</h1>
					{space.description && (
						<p className="text-sm text-neutral-600">{space.description}</p>
					)}
				</div>
			</div>

			<div className="hidden gap-2 sm:flex">
				<Button variant="flat">Открыть календарь</Button>
				<Button color="primary">Добавить событие</Button>
			</div>
		</div>
	);
};
