import React from 'react';
import { Button, Card, CardBody, CardHeader, Code, Progress } from '@heroui/react';
import { AlertTriangle, Link as LinkIcon, RotateCcw } from 'lucide-react';

import { CopyButton } from 'shared/ui';

type Props = {
	code: string;
	error: string;
	isLoading: boolean;

	onClose: () => void;
	onCreate: () => void;
	onReset: () => void;
};

export const CreateSpaceTgLinkCodeForm = (props: Props) => {
	const { onClose, code, error, isLoading, onCreate, onReset } = props;

	return (
		<div className="p-4">
			<div className="mb-4 flex items-center gap-3">
				<div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-100">
					<LinkIcon size={18} />
				</div>
				<div>
					<div className="text-lg font-semibold">Привязать Telegram-чат</div>
					<div className="text-sm text-neutral-500 font-normal">
						Сгенерируйте одноразовый код и выполните команду в нужной группе
					</div>
				</div>
			</div>

			{error && (
				<div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
					<AlertTriangle size={16} />
					<span>{error}</span>
				</div>
			)}

			{isLoading && (
				<div className="space-y-3">
					<Progress isIndeterminate aria-label="Генерируем код..." />
					<div className="text-sm text-neutral-600">Готовим одноразовый код…</div>
				</div>
			)}

			{code && (
				<>
					<Card className={'border border-neutral-200'}>
						<CardHeader>
							<div className="text-base font-medium">Код готов</div>
						</CardHeader>

						<CardBody className="space-y-4">
							<div className="space-y-2">
								<div className="text-sm font-medium">Как привязать чат</div>
								<ol className="list-inside list-decimal space-y-1 text-sm text-neutral-700">
									<li>
										Добавь бота в нужный <b>групповой чат</b>
									</li>

									<li className={'flex flex-col gap-2'}>
										Отправь в чате команду:{' '}
										<Code className="rounded-lg px-3 py-2 truncate">
											/link {code}
										</Code>
										<CopyButton text={`/link ${code}`} />
									</li>

									<li>Готово — чат будет привязан к пространству.</li>
								</ol>

								<div className="text-xs text-neutral-500">
									Поддерживаются группы и супергруппы (в т.ч. темы).
								</div>
							</div>

							<div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
								<AlertTriangle size={16} className="mt-0.5" />
								Не передавай код посторонним! Привязать пространство может только
								владелец кода.
							</div>
						</CardBody>
					</Card>

					<div className="flex items-center justify-between">
						<Button
							variant="flat"
							startContent={<RotateCcw size={16} />}
							onPress={onReset}
						>
							Создать новый код
						</Button>
					</div>
				</>
			)}

			<div className="mt-4 flex justify-end gap-2">
				<Button variant="light" onPress={onClose}>
					Закрыть
				</Button>

				{!code && (
					<Button color="primary" onPress={onCreate} isLoading={isLoading}>
						Сгенерировать
					</Button>
				)}
			</div>
		</div>
	);
};
