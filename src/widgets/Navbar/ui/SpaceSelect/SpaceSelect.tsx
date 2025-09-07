import { useCallback, useEffect, useState } from 'react';
import { Select, SelectItem } from '@heroui/react';
import { mutate } from 'swr';

import { useGetPersonalUserSpaces } from 'entities/Space';

import { CurrentSpaceIdController } from 'shared/lib';

export const SpaceSelect = () => {
	const [selectedSpaceId, setSelectedSpaceId] = useState<string>('');

	const { data: spaces, isLoading: isSpacesLoading } = useGetPersonalUserSpaces();

	const handleSelectSpace = (spaceId?: string) => {
		if (!spaceId) return;

		CurrentSpaceIdController.setCurrentSpaceId(spaceId);
		setSelectedSpaceId(spaceId);

		mutate(() => true).finally();
	};

	const initSelectedSpace = useCallback(() => {
		const savedSpaceId = CurrentSpaceIdController.getSavedSpaceId();

		if (selectedSpaceId === CurrentSpaceIdController.getSavedSpaceId()) return;
		if (!spaces) return;

		if (savedSpaceId && spaces?.find((space) => space.id === selectedSpaceId)) {
			setSelectedSpaceId(savedSpaceId);
			return;
		}

		setSelectedSpaceId(spaces[0].id);
	}, [selectedSpaceId, spaces]);

	useEffect(() => {
		initSelectedSpace();
	}, [initSelectedSpace]);

	return (
		<Select
			size={'sm'}
			items={spaces || []}
			isLoading={isSpacesLoading}
			onSelectionChange={(selected) => handleSelectSpace(selected.currentKey)}
			selectedKeys={[selectedSpaceId]}
		>
			{(space) => <SelectItem key={space.id}>{space.name}</SelectItem>}
		</Select>
	);
};
