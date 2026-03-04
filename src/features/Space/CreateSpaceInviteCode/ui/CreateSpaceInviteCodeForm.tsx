import { Button } from '@heroui/react';
import { Link as LinkIcon } from 'lucide-react';

import { SpaceInviteCodeResult } from './SpaceInviteCodeResult';

type Props = {
	linkUrl: string | null;
	isLoading: boolean;

	onClose: () => void;
	onCreateInviteLink: () => void;
};

export const CreateSpaceInviteCodeForm = (props: Props) => {
	const {
		linkUrl,
		isLoading,

		onClose,
		onCreateInviteLink,
	} = props;

	return (
		<div className="p-4">
			<div className="mb-4 flex items-center gap-3">
				<div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-100">
					<LinkIcon size={18} />
				</div>
				<div>
					<h2 className="text-lg font-semibold">Пригласить в пространство</h2>
					<p className="text-sm font-normal text-neutral-500">
						Создайте ссылку для приглашения участников
					</p>
				</div>
			</div>

			{linkUrl && <SpaceInviteCodeResult linkUrl={linkUrl} />}

			<div className="mt-4 space-y-3">
				<div className="text-xs text-neutral-500">
					Только владелец пространства может создавать ссылки
				</div>

				<Button
					color="primary"
					onPress={onCreateInviteLink}
					isLoading={isLoading}
					fullWidth
				>
					Создать ссылку
				</Button>

				<Button variant="flat" onPress={onClose} fullWidth>
					Закрыть
				</Button>
			</div>
		</div>
	);
};
