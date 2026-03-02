import React from 'react';
import { Button } from '@heroui/react';
import { Share2 } from 'lucide-react';

const canShare = typeof navigator !== 'undefined' && !!navigator.share;

type Props = ShareData;

export const ShareButton = (props: Props) => {
	const shareData = props;

	const handleShare = () => {
		if (!canShare) return;
		navigator.share(shareData).catch(console.error);
	};

	return (
		<div>
			<Button
				startContent={<Share2 size={16} />}
				onPress={handleShare}
				isDisabled={!canShare}
				variant="flat"
				size="sm"
			>
				Поделиться
			</Button>
		</div>
	);
};
