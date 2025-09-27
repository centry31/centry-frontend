import React, { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
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
import { addMinutes } from 'date-fns';

import { safeParseAbsoluteToLocal } from 'shared/lib';

import type { CreateSpaceInvite } from '../model/types';

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

const DEFAULT_EXPIRES = addMinutes(new Date(), 15).toISOString();

export const CreateInviteLinkForm = () => {
	const { control, setValue } = useForm<CreateSpaceInvite>({
		defaultValues: {
			maxUses: 1,
			expiresAt: DEFAULT_EXPIRES,
		},
	});

	const {
		field: { value: maxUses, onChange: onChangeMaxUses },
	} = useController({ control, name: 'maxUses' });

	const {
		field: { value: expiresAtIso, onChange: onChangeExpiresAtIso },
	} = useController({ control, name: 'expiresAt' });

	const [usesMode, setUsesMode] = useState<'preset' | 'custom'>('preset');
	const [timeMode, setTimeMode] = useState<'preset' | 'custom'>('preset');

	const handlePickExpiresAtBump = (minutes: number) => {
		const iso = addMinutes(new Date(), minutes).toISOString();
		setValue('expiresAt', iso, { shouldValidate: true });
		setTimeMode('preset');
	};

	/**
	 * @summary <DateInput /> работает с ZoneDateTime типом, нужно это учитывать
	 *
	 * Работа с DateInput - компонент возвращает и принимает ZoneDateTime, поэтому для корректной работы
	 * нужно форматировать полученное значение, конвертируя в строку (ISO).
	 *
	 * Все передаваемые значения в компонент в качестве value также должны быть конвертированы в ZoneDateTime
	 * */
	const handleChangeExpiresAt = (expiresAt?: ZonedDateTime | null) => {
		if (!expiresAt) return;

		const absoluteString = expiresAt.toAbsoluteString();
		onChangeExpiresAtIso(absoluteString);
	};

	return (
		<Card>
			<CardHeader>
				<h3 className="text-base font-medium">Параметры ссылки</h3>
			</CardHeader>

			<CardBody className={'flex flex-col gap-4'}>
				{/* Лимит использований */}
				<div className="flex flex-col gap-2">
					<div className="text-sm font-medium">Лимит использований</div>

					<RadioGroup
						orientation="horizontal"
						value={usesMode}
						onValueChange={(v) => setUsesMode(v as 'preset' | 'custom')}
						size={'sm'}
					>
						<Radio value="preset">Пресет</Radio>
						<Radio value="custom">Своё число</Radio>
					</RadioGroup>

					{usesMode === 'preset' && (
						<div className="flex flex-wrap gap-2">
							{USES_PRESETS.map((p) => (
								<Button
									key={p.value}
									size="sm"
									variant={maxUses === p.value ? 'solid' : 'flat'}
									color={maxUses === p.value ? 'primary' : 'default'}
									onPress={() => onChangeMaxUses(p.value)}
								>
									{p.label}
								</Button>
							))}
						</div>
					)}

					{usesMode === 'custom' && (
						<Input
							type="number"
							label="Количество"
							min={1}
							value={String(maxUses ?? '')}
							onChange={(e) => onChangeMaxUses(Number(e.target.value))}
						/>
					)}
				</div>

				{/* Срок действия */}
				<div className="flex flex-col gap-2">
					<div className="text-sm font-medium">Срок действия</div>

					<RadioGroup
						orientation="horizontal"
						value={timeMode}
						onValueChange={(v) => setTimeMode(v as 'preset' | 'custom')}
						size={'sm'}
					>
						<Radio value="preset">Пресет</Radio>
						<Radio value="custom">Дата и время</Radio>
					</RadioGroup>

					{timeMode === 'preset' && (
						<div className="flex flex-wrap gap-2">
							{PRESET_BUMPS.map((b) => (
								<Button
									key={b.minutes}
									size="sm"
									variant="flat"
									onPress={() => handlePickExpiresAtBump(b.minutes)}
								>
									{b.label}
								</Button>
							))}
						</div>
					)}

					{timeMode === 'custom' && (
						<DateInput
							label="Истекает"
							value={safeParseAbsoluteToLocal(expiresAtIso)}
							onChange={handleChangeExpiresAt}
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
