import { Button, Card, CardBody, Tab, Tabs } from '@heroui/react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

import type { SpaceAccess } from 'entities/Space';

type Props = {
	view: string;
	date: Date;

	onPrev: () => void;
	onNext: () => void;
	onToday: () => void;
	onChangeView: (v: string) => void;

	spaceAccess?: SpaceAccess;
	onCreateEvent: () => void;
};

const capitalize = (value: string) => {
	if (!value.length) return value;
	return `${value[0].toUpperCase()}${value.slice(1)}`;
};

const formatTitle = (view: string, date: Date) => {
	if (view === 'timeGridDay') {
		const dayTitle = date.toLocaleDateString('ru-RU', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
		});
		return capitalize(dayTitle);
	}

	const monthTitle = date.toLocaleDateString('ru-RU', {
		year: 'numeric',
	});

	return capitalize(monthTitle);
};

export const CalendarToolbar = (props: Props) => {
	const { view, date, onPrev, onNext, onToday, onChangeView } = props;
	const { spaceAccess, onCreateEvent } = props;

	const selectedView = view === 'multiMonth' || view === 'dayGridMonth' ? 'multiMonthYear' : view;

	const isToday = new Date().toDateString() === date.toDateString();
	const title = formatTitle(view, date);

	return (
		<Card
			shadow="none"
			className="calendar-toolbar sticky top-0 z-10 border border-white/70 bg-white/85 backdrop-blur-xl"
		>
			<CardBody className="gap-3 p-2 sm:p-3">
				<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
					<div className="flex items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-3">
						<div className="flex shrink-0 items-center gap-2">
							<Button
								isIconOnly
								size="sm"
								variant="flat"
								onPress={onPrev}
								aria-label="Назад"
							>
								<ChevronLeft size={18} />
							</Button>

							<Button
								isIconOnly
								size="sm"
								variant="flat"
								onPress={onNext}
								aria-label="Вперёд"
							>
								<ChevronRight size={18} />
							</Button>

							{!isToday && (
								<Button size="sm" variant="flat" color="primary" onPress={onToday}>
									Сегодня
								</Button>
							)}
						</div>

						<div className="min-w-0 flex flex-wrap items-center justify-end gap-2 sm:flex-col sm:items-start sm:gap-1">
							<div className="truncate text-lg font-semibold leading-none sm:text-2xl sm:leading-tight">
								{title}
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
						<Tabs
							aria-label="calendar-view"
							size="sm"
							radius="full"
							selectedKey={selectedView}
							onSelectionChange={(key) => onChangeView(String(key))}
							className="w-full sm:w-auto"
							classNames={{
								tabList: 'w-full sm:w-auto bg-default-100 p-1',
							}}
						>
							<Tab key="timeGridDay" title="День" />
							<Tab key="multiMonthYear" title="Месяц" />
							<Tab key="listWeek" title="Список" />
						</Tabs>

						{spaceAccess === 'owner' && (
							<Button
								color="primary"
								size="sm"
								startContent={<Plus size={16} />}
								onPress={onCreateEvent}
								className="w-full sm:w-auto"
							>
								Событие
							</Button>
						)}
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
