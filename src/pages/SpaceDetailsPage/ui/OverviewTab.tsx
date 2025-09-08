import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import { Info } from 'lucide-react';

export const OverviewTab = () => {
	return (
		<div className="mt-2 grid grid-cols-1 gap-3 lg:grid-cols-2">
			<Card className="border border-neutral-200">
				<CardHeader>
					<h3 className="text-base font-medium">Быстрые действия</h3>
				</CardHeader>

				<CardBody className="flex flex-wrap gap-2">
					<Button variant="flat">Создать напоминание</Button>
					<Button variant="flat">Пригласить участника</Button>
					<Button variant="flat">Открыть в Telegram</Button>
				</CardBody>
			</Card>

			<Card className="border border-neutral-200">
				<CardHeader>
					<h3 className="text-base font-medium">Справка</h3>
				</CardHeader>

				<CardBody>
					<div className="flex items-start gap-2 text-sm text-neutral-600">
						<Info size={16} className="mt-0.5" />

						<p>Здесь краткое описание как пользоваться пространством.</p>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};
