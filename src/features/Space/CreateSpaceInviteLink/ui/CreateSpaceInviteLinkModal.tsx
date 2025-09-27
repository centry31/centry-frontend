import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { addMinutes } from 'date-fns';
import { AlertTriangle, Link as LinkIcon } from 'lucide-react';

import { useCreateInviteLink } from '../api/useCreateInviteLink';
import type { CreateSpaceInvite } from '../model/types';
import { CreateInviteLinkForm } from './CreateInviteLinkForm';
import { InviteLinkResult } from './InviteLinkResult';

const DEFAULT_EXPIRES = addMinutes(new Date(), 15).toISOString();

const getLinkUrl = (code: string) => {
	if (!code) return null;

	const host = window.location.origin;
	return `${host}/spaces/join?code=${code}`;
};

type Props = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
};

export const CreateSpaceInviteLinkModal = (props: Props) => {
	const { isOpen, onOpenChange } = props;

	const { isLoading, request: createInviteLink } = useCreateInviteLink();
	const [createdCode, setCreatedCode] = useState<string>('');

	const form = useForm<CreateSpaceInvite>({
		defaultValues: {
			maxUses: 1,
			expiresAt: DEFAULT_EXPIRES,
		},
	});

	const linkUrl = getLinkUrl(createdCode);

	const handleCreateInviteLink = async () => {
		const formValues = form.getValues();

		const link = await createInviteLink(formValues);
		if (!link) return;

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
							<CreateInviteLinkForm />
						</FormProvider>
					)}

					{/* Результат */}
					{linkUrl && <InviteLinkResult linkUrl={linkUrl} />}

					<div className="flex items-start gap-2 rounded-lg bg-red-300 p-3 text-xs text-white">
						<AlertTriangle size={16} className="mt-0.5" />
						Ссылка будет показана только один раз, сохраните ее!
					</div>
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
