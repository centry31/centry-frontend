import { ShieldCheck } from 'lucide-react';

type Props = {
	redirectIn?: number;
};

export const SuccessBlock = (props: Props) => {
	const { redirectIn } = props;

	return (
		<div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
			<div className="flex items-start gap-3">
				<div className="grid h-9 w-9 place-items-center rounded-lg bg-green-100 text-green-700">
					<ShieldCheck size={18} />
				</div>

				<div className="flex-1">
					<div className="text-sm font-medium">Успешный вход</div>

					<div className="text-xs text-neutral-500 mt-1">
						Перенаправим через {redirectIn} сек…
					</div>
				</div>
			</div>
		</div>
	);
};
