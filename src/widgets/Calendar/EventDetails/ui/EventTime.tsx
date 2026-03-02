import { CalendarClock } from 'lucide-react';

import { formatDateRange } from '../lib/formatDateRange';

type Props = {
	start: string;
	duration: number;
};

export const EventTime = (props: Props) => {
	const { start, duration } = props;

	const { date, time } = formatDateRange(start, duration);

	return (
		<div className="flex items-start gap-2 text-sm text-neutral-600">
			<CalendarClock size={16} className="mt-0.5 shrink-0" />
			<div>
				<div className="font-medium text-neutral-800">{date}</div>
				<div className="text-neutral-500">{time}</div>
			</div>
		</div>
	);
};
