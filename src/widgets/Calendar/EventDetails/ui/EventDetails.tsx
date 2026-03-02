import { Button, Divider } from '@heroui/react';
import { Pencil } from 'lucide-react';

import type { CalendarEvent } from 'entities/CalendarEvent';

import { EventDescription } from './EventDescription';
import { EventTime } from './EventTime';
import { ReminderChip } from './ReminderChip';

type Props = {
	event: CalendarEvent;
	isEditable: boolean;

	onEdit?: (event: CalendarEvent) => void;
};

export const EventDetails = (props: Props) => {
	const { event, isEditable, onEdit } = props;
	const { title, description, start, duration, reminders } = event;

	const handleEdit = () => {
		onEdit?.(event);
	};

	return (
		<div>
			{/* header */}
			<div className="flex items-start justify-between gap-3 p-4">
				<div className="min-w-0 flex-1">
					<h3 className="truncate text-xl font-semibold sm:text-2xl">{title}</h3>
					<p className="mt-1 text-sm text-neutral-500">Событие календаря</p>
				</div>
			</div>

			{/* body */}
			<div className="p-4 space-y-4">
				<section>
					<EventTime start={start} duration={duration} />
				</section>

				<Divider />

				<section>
					<EventDescription description={description} />
				</section>

				<Divider />

				<section className="space-y-2">
					<div className="flex items-center justify-between">
						<div className="text-sm font-medium text-neutral-700">Напоминания</div>
					</div>

					{!!reminders.length && (
						<div className="flex flex-wrap gap-2">
							{reminders.map((r, i) => (
								<ReminderChip
									key={`${r.offsetMinutes}-${i}`}
									offsetMinutes={r.offsetMinutes}
								/>
							))}
						</div>
					)}

					{!reminders.length && (
						<div className="text-sm text-neutral-500">Напоминаний нет</div>
					)}
				</section>
			</div>

			{/* footer */}
			{isEditable && (
				<div className="flex flex-col gap-2 p-4 sm:flex-row sm:justify-between">
					<Button
						color="primary"
						startContent={<Pencil size={16} />}
						onPress={handleEdit}
					>
						Редактировать
					</Button>
				</div>
			)}
		</div>
	);
};
