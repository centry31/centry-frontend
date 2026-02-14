import { Button } from '@heroui/react';
import type { ZonedDateTime } from '@internationalized/date';
import { Link as LinkIcon } from 'lucide-react';

import { CreateSpaceInviteCodeOptionsForm } from './CreateSpaceInviteCodeOptionsForm';
import { SpaceInviteCodeResult } from './SpaceInviteCodeResult';

type Mode = 'preset' | 'custom';

type Props = {
	linkUrl: string | null;
	createdCode: string;
	maxUses: number;
	expiresAtIso: string;
	usesMode: Mode;
	timeMode: Mode;

	onClose: () => void;
	onChangeMaxUses: (value: number) => void;
	onChangeExpiresAt: (value?: ZonedDateTime | null) => void;
	onPickExpiresAtBump: (minutes: number) => void;
	onChangeUsesMode: (mode: Mode) => void;
	onChangeTimeMode: (mode: Mode) => void;
	onCreateInviteLink: () => void;

	isLoading: boolean;
};

export const CreateSpaceInviteCodeForm = (props: Props) => {
	const {
		linkUrl,
		createdCode,
		maxUses,
		expiresAtIso,
		usesMode,
		timeMode,

		onClose,
		onChangeMaxUses,
		onChangeExpiresAt,
		onPickExpiresAtBump,
		onChangeUsesMode,
		onChangeTimeMode,
		onCreateInviteLink,

		isLoading,
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
						Создайте одноразовую ссылку с ограничением по сроку и использованиям
					</p>
				</div>
			</div>

			{!createdCode && (
				<CreateSpaceInviteCodeOptionsForm
					maxUses={maxUses}
					expiresAtIso={expiresAtIso}
					usesMode={usesMode}
					timeMode={timeMode}
					onChangeMaxUses={onChangeMaxUses}
					onChangeExpiresAt={onChangeExpiresAt}
					onPickExpiresAtBump={onPickExpiresAtBump}
					onChangeUsesMode={onChangeUsesMode}
					onChangeTimeMode={onChangeTimeMode}
				/>
			)}

			{linkUrl && <SpaceInviteCodeResult linkUrl={linkUrl} />}

			<div className="mt-4 space-y-3">
				<div className="text-xs text-neutral-500">
					Только владельцы/админы пространства могут создавать инвайт-ссылки.
				</div>

				<Button variant="light" onPress={onClose} fullWidth>
					Закрыть
				</Button>

				<Button
					color="primary"
					onPress={onCreateInviteLink}
					isLoading={isLoading}
					fullWidth
				>
					Создать ссылку
				</Button>
			</div>
		</div>
	);
};
