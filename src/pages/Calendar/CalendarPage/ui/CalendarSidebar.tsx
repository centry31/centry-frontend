import { Calendar, Card, CardBody, Chip, Spinner } from '@heroui/react';
import type { DateValue } from '@internationalized/date';

import { safeParseAbsoluteToLocal } from 'shared/lib';

type Props = {
	currentDate: Date;
	onDateChange: (value: DateValue) => void;

	eventsCount: number;

	isEditable: boolean;
	isEventsLoading: boolean;
};

export const CalendarSidebar = (props: Props) => {
	const { currentDate, onDateChange, eventsCount, isEditable, isEventsLoading } = props;

	return (
		<Card
			shadow="none"
			className="calendar-sidebar hidden w-[320px] shrink-0 border border-white/70 bg-white/88 lg:flex"
		>
			<CardBody className="gap-4 p-4">
				<Calendar
					classNames={{ base: 'border-none shadow-none' }}
					className="calendar-mini bg-transparent m-auto"
					value={safeParseAbsoluteToLocal(currentDate.toISOString())}
					onChange={onDateChange}
				/>

				<div className="flex flex-wrap gap-2">
					<Chip size="sm" variant="flat" color="primary">
						Событий: {eventsCount}
					</Chip>

					<Chip size="sm" variant="flat" color={isEditable ? 'success' : 'default'}>
						{isEditable ? 'Редактирование' : 'Только просмотр'}
					</Chip>
				</div>

				{isEventsLoading && (
					<div className="flex items-center gap-2 text-sm text-default-500">
						<Spinner size="sm" />
						Загружаем события...
					</div>
				)}
			</CardBody>
		</Card>
	);
};
