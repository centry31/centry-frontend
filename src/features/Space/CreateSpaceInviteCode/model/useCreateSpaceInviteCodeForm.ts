import { useCallback, useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import type { ZonedDateTime } from '@internationalized/date';
import { addMinutes } from 'date-fns';

import type { CreateSpaceInviteCode } from 'entities/SpaceInviteCode';
import {
	getSpaceInviteLinkUrl,
	useCreateInviteCode,
	useGetSpaceInviteCodes,
} from 'entities/SpaceInviteCode';

const DEFAULT_EXPIRES = addMinutes(new Date(), 15).toISOString();

type Props = {
	spaceId: string;
	isOpen: boolean;
};

export const useCreateSpaceInviteCodeForm = (props: Props) => {
	const { spaceId, isOpen } = props;
	const { mutate: mutateSpaceCodes } = useGetSpaceInviteCodes({ spaceId });
	const { isLoading, request: createInviteCode } = useCreateInviteCode();

	const [createdCode, setCreatedCode] = useState<string>('');
	const [usesMode, setUsesMode] = useState<'preset' | 'custom'>('preset');
	const [timeMode, setTimeMode] = useState<'preset' | 'custom'>('preset');

	const form = useForm<CreateSpaceInviteCode>({
		defaultValues: {
			maxUses: 1,
			expiresAt: DEFAULT_EXPIRES,
		},
	});

	const {
		field: { value: maxUses, onChange: onChangeMaxUses },
	} = useController({ control: form.control, name: 'maxUses' });

	const {
		field: { value: expiresAtIso, onChange: onChangeExpiresAtIso },
	} = useController({ control: form.control, name: 'expiresAt' });

	const resetFormValues = useCallback(() => {
		form.reset();
		setCreatedCode('');
		setUsesMode('preset');
		setTimeMode('preset');
	}, [form]);

	useEffect(() => {
		if (!isOpen) return;
		resetFormValues();
	}, [isOpen, resetFormValues]);

	const handleChangeMaxUses = useCallback(
		(value: number) => {
			onChangeMaxUses(value);
		},
		[onChangeMaxUses],
	);

	const handlePickExpiresAtBump = useCallback(
		(minutes: number) => {
			const iso = addMinutes(new Date(), minutes).toISOString();
			form.setValue('expiresAt', iso, { shouldValidate: true });
			setTimeMode('preset');
		},
		[form],
	);

	const handleChangeExpiresAt = useCallback(
		(expiresAt?: ZonedDateTime | null) => {
			if (!expiresAt) return;
			onChangeExpiresAtIso(expiresAt.toAbsoluteString());
		},
		[onChangeExpiresAtIso],
	);

	const handleCreateInviteLink = useCallback(async () => {
		const formValues = form.getValues();
		const spaceInviteCode = await createInviteCode({ ...formValues, spaceId });
		if (!spaceInviteCode) return;

		mutateSpaceCodes();
		setCreatedCode(spaceInviteCode.code);
	}, [createInviteCode, form, mutateSpaceCodes, spaceId]);

	return {
		isLoading,
		maxUses: maxUses ?? 1,
		expiresAtIso: expiresAtIso || DEFAULT_EXPIRES,
		usesMode,
		timeMode,
		createdCode,
		linkUrl: getSpaceInviteLinkUrl(createdCode),

		onChangeMaxUses: handleChangeMaxUses,
		onChangeExpiresAt: handleChangeExpiresAt,
		onPickExpiresAtBump: handlePickExpiresAtBump,
		onChangeUsesMode: setUsesMode,
		onChangeTimeMode: setTimeMode,
		onCreateInviteLink: handleCreateInviteLink,
	};
};
