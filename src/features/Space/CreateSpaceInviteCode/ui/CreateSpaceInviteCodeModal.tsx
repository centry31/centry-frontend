import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { addMinutes } from 'date-fns';
import { Link as LinkIcon } from 'lucide-react';

import { getSpaceInviteLinkUrl, useGetSpaceInviteCodes } from 'entities/SpaceInviteCode';

import { useCreateInviteCode } from '../api/useCreateInviteCode';
import type { CreateSpaceInviteCodeFormValues } from '../model/types';
import { CreateSpaceInviteCodeForm } from './CreateSpaceInviteCodeForm';
import { SpaceInviteCodeResult } from './SpaceInviteCodeResult';

const DEFAULT_EXPIRES = addMinutes(new Date(), 15).toISOString();

type Props = {
	spaceId: string;

	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
};

export const CreateSpaceInviteCodeModal = (props: Props) => {
	const { spaceId, isOpen, onOpenChange } = props;

	const { mutate: mutateSpaceCodes } = useGetSpaceInviteCodes({ spaceId });
	const { isLoading, request: createInviteCode } = useCreateInviteCode();

	const [createdCode, setCreatedCode] = useState<string>('');

	const form = useForm<CreateSpaceInviteCodeFormValues>({
		defaultValues: {
			maxUses: 1,
			expiresAt: DEFAULT_EXPIRES,
		},
	});

	/** Сбрасываем значения, чтобы при следующем открытии формы не было старых данных */
	const resetFormValues = useCallback(() => {
		form.reset();
		setCreatedCode('');
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		resetFormValues();
	}, [isOpen]);

	const linkUrl = getSpaceInviteLinkUrl(createdCode);

	const handleSuccessCreateCode = () => {
		mutateSpaceCodes();
	};

	const handleCreateInviteLink = async () => {
		const formValues = form.getValues();

		const link = await createInviteCode({ ...formValues, spaceId });
		if (!link) return;

		handleSuccessCreateCode();
		setCreatedCode(link);
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} shouldBlockScroll={false}>
			<ModalContent>
				<ModalHeader className="flex items-center gap-3">
					<div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-100">
						<LinkIcon size={18} />
					</div>

					<div>
						<h2 className="text-lg font-semibold">Пригласить в пространство</h2>

						<p className="text-sm font-normal text-neutral-500">
							Создайте одноразовую ссылку с ограничением по сроку и использованиям
						</p>
					</div>
				</ModalHeader>

				<ModalBody>
					{/* Форма создания */}
					{!createdCode && (
						<FormProvider {...form}>
							<CreateSpaceInviteCodeForm />
						</FormProvider>
					)}

					{/* Результат */}
					{linkUrl && <SpaceInviteCodeResult linkUrl={linkUrl} />}
				</ModalBody>

				<ModalFooter>
					<div className="text-xs text-neutral-500">
						Только владельцы/админы пространства могут создавать инвайт-ссылки.
					</div>

					<Button
						color="primary"
						onPress={handleCreateInviteLink}
						isLoading={isLoading}
						fullWidth
					>
						Создать ссылку
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
