import { TriangleAlert } from 'lucide-react';

export const EmptyStateNoCode = () => {
	return (
		<div className="space-y-3 text-center">
			<TriangleAlert className="mx-auto text-neutral-400" size={28} />

			<h2 className="text-base font-medium">
				Не найден параметр <code>code</code>
			</h2>

			<p className="text-sm text-neutral-500">
				Откройте ссылку из Telegram на этом устройстве.
			</p>
		</div>
	);
};
