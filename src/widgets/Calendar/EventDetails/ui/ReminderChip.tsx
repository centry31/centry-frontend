import { Chip } from '@heroui/react';
import { Bell } from 'lucide-react';

import { formatMinutesOffset } from 'shared/lib';

type Props = {
	offsetMinutes: number;
};

export const ReminderChip = (props: Props) => {
	const { offsetMinutes } = props;

	return (
		<Chip size="sm" variant="flat" startContent={<Bell size={14} className="mr-1" />}>
			за {formatMinutesOffset(offsetMinutes)}
		</Chip>
	);
};
