import { useCallback, useState } from 'react';

import { useCreateTgLinkCode } from 'entities/SpaceTgChat';

type Props = {
	spaceId: string;
};

export const useCreateSpaceTgLinkCodeForm = (props: Props) => {
	const { spaceId } = props;

	const [code, setCode] = useState<string>('');
	const { request: createCode, isLoading, error } = useCreateTgLinkCode();

	const handleCreate = useCallback(async () => {
		const createdCode = await createCode({ spaceId });
		if (!createdCode) return;
		setCode(createdCode);
	}, [createCode, spaceId]);

	const handleReset = useCallback(() => {
		setCode('');
	}, []);

	return {
		code,
		error,
		isLoading,

		handleCreate,
		handleReset,
	};
};
