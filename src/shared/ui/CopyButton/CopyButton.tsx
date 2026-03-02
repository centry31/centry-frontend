import React, { useState } from 'react';
import { Button, type ButtonProps } from '@heroui/react';
import { Check, Copy } from 'lucide-react';

type Props = ButtonProps & {
	text: string;
};

export const CopyButton = (props: Props) => {
	const { text, ...restProps } = props;

	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			})
			.catch(console.error);
	};

	return (
		<Button
			startContent={copied ? <Check size={16} /> : <Copy size={16} />}
			onPress={handleCopy}
			variant="flat"
			size="sm"
			color={copied ? 'success' : 'default'}
			{...restProps}
		>
			{copied ? 'Скопировано' : 'Копировать'}
		</Button>
	);
};
