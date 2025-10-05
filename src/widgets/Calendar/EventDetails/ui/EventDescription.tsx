import { FileText } from 'lucide-react';

type Props = {
	description?: string;
};

export const EventDescription = (props: Props) => {
	const { description } = props;

	if (!description) {
		return (
			<div className="flex items-start gap-2 text-sm text-neutral-500">
				<FileText size={16} className="mt-0.5" />

				<span>Описание отсутствует</span>
			</div>
		);
	}

	return (
		<p className="whitespace-pre-wrap text-[15px] leading-6 text-neutral-800 flex gap-2">
			<FileText size={16} className="mt-0.5" /> <span>{description}</span>
		</p>
	);
};
