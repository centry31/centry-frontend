import { Button, Tab, Tabs } from '@heroui/react';

type Props = {
	view: string;
	date: Date;

	onPrev: () => void;
	onNext: () => void;
	onToday: () => void;
	onChangeView: (v: string) => void;

	onCreateEvent: () => void;
};

export const CalendarToolbar = (props: Props) => {
	const { view, date, onPrev, onNext, onToday, onChangeView, onCreateEvent } = props;
	const isToday = new Date().toDateString() === date.toDateString();

	return (
		<div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 border-b border-b-blue-100 p-2 backdrop-blur">
			<Tabs
				aria-label="calendar-view"
				size="sm"
				selectedKey={view}
				onSelectionChange={(key) => onChangeView(String(key))}
				className="w-full sm:w-auto"
				classNames={{
					tabList: 'w-full sm:w-auto',
				}}
			>
				<Tab key="timeGridDay" title="День" />
				<Tab key="dayGridMonth" title="Месяц" />
				<Tab key="listWeek" title="Список" />
			</Tabs>

			<div className="flex w-full sm:w-auto items-center gap-2">
				<Button fullWidth size="sm" variant="flat" onPress={onPrev}>
					←
				</Button>

				{!isToday && (
					<Button fullWidth size="sm" variant="flat" onPress={onToday}>
						Сегодня
					</Button>
				)}

				<Button fullWidth size="sm" variant="flat" onPress={onNext}>
					→
				</Button>
			</div>

			<div className={'flex justify-between align-middle w-full'}>
				<div className="text-medium sm:text-2xl font-medium">
					{date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
				</div>

				<Button className={'h-5 sm:h-auto'} color={'primary'} onPress={onCreateEvent}>
					+
				</Button>
			</div>
		</div>
	);
};
