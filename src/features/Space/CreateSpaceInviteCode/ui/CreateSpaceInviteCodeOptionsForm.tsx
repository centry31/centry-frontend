import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Chip,
	DateInput,
	Input,
	Radio,
	RadioGroup,
} from '@heroui/react';
import type { ZonedDateTime } from '@internationalized/date';

import { safeParseAbsoluteToLocal } from 'shared/lib';

const USES_PRESETS = [
	{ label: '1 раз', value: 1 },
	{ label: '5 раз', value: 5 },
	{ label: '20 раз', value: 20 },
];

const PRESET_BUMPS = [
	{ label: '15 мин', minutes: 15 },
	{ label: '1 час', minutes: 60 },
	{ label: '1 день', minutes: 1440 },
];

type Mode = 'preset' | 'custom';

type Props = {
	maxUses: number;
	expiresAtIso: string;
	usesMode: Mode;
	timeMode: Mode;

	onChangeMaxUses: (value: number) => void;
	onChangeExpiresAt: (value?: ZonedDateTime | null) => void;
	onPickExpiresAtBump: (minutes: number) => void;
	onChangeUsesMode: (mode: Mode) => void;
	onChangeTimeMode: (mode: Mode) => void;
};

export const CreateSpaceInviteCodeOptionsForm = (props: Props) => {
	const {
		maxUses,
		expiresAtIso,
		usesMode,
		timeMode,

		onChangeMaxUses,
		onChangeExpiresAt,
		onPickExpiresAtBump,
		onChangeUsesMode,
		onChangeTimeMode,
	} = props;

	return (
		<Card>
			<CardHeader>
				<h3 className="text-base font-medium">Параметры ссылки</h3>
			</CardHeader>

			<CardBody className={'flex flex-col gap-4'}>
				<div className="flex flex-col gap-2">
					<div className="text-sm font-medium">Лимит использований</div>

					<RadioGroup
						orientation="horizontal"
						value={usesMode}
						onValueChange={(value) => onChangeUsesMode(value as Mode)}
						size={'sm'}
					>
						<Radio value="preset">Пресет</Radio>
						<Radio value="custom">Своё число</Radio>
					</RadioGroup>

					{usesMode === 'preset' && (
						<div className="flex flex-wrap gap-2">
							{USES_PRESETS.map((preset) => (
								<Button
									key={preset.value}
									size="sm"
									variant={maxUses === preset.value ? 'solid' : 'flat'}
									color={maxUses === preset.value ? 'primary' : 'default'}
									onPress={() => onChangeMaxUses(preset.value)}
								>
									{preset.label}
								</Button>
							))}
						</div>
					)}

					{usesMode === 'custom' && (
						<Input
							type="number"
							label="Количество"
							min={1}
							value={String(maxUses)}
							onChange={(event) => onChangeMaxUses(Number(event.target.value))}
						/>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<div className="text-sm font-medium">Срок действия</div>

					<RadioGroup
						orientation="horizontal"
						value={timeMode}
						onValueChange={(value) => onChangeTimeMode(value as Mode)}
						size={'sm'}
					>
						<Radio value="preset">Пресет</Radio>
						<Radio value="custom">Дата и время</Radio>
					</RadioGroup>

					{timeMode === 'preset' && (
						<div className="flex flex-wrap gap-2">
							{PRESET_BUMPS.map((preset) => (
								<Button
									key={preset.minutes}
									size="sm"
									variant="flat"
									onPress={() => onPickExpiresAtBump(preset.minutes)}
								>
									{preset.label}
								</Button>
							))}
						</div>
					)}

					{timeMode === 'custom' && (
						<DateInput
							label="Истекает"
							value={safeParseAbsoluteToLocal(expiresAtIso)}
							onChange={onChangeExpiresAt}
							hideTimeZone
						/>
					)}

					<div className="text-xs text-neutral-500 flex gap-1 items-center">
						<div>Текущее значение:</div>
						<Chip size="sm" variant="flat" className="align-middle">
							{new Date(expiresAtIso).toLocaleString()}
						</Chip>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
