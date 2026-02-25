import { generatePath, useMatch, useNavigate } from 'react-router-dom';
import { Select, SelectItem } from '@heroui/react';

import { useGetUserSpaces } from 'entities/Space';

import { RoutesPaths } from 'shared/configs';
import { resolveSpaceId, setLastSelectedSpaceId } from 'shared/lib';

export const SpaceSelect = () => {
	const calendarMatch = useMatch(RoutesPaths.calendar);
	const selectedSpaceId = calendarMatch?.params.spaceId;
	const navigate = useNavigate();

	const { data: spaces, isLoading: isSpacesLoading } = useGetUserSpaces();
	const resolvedSpaceId = resolveSpaceId({
		spaces,
		preferredSpaceId: selectedSpaceId,
	});

	const handleSelectSpace = (spaceId?: string) => {
		if (!spaceId) return;

		const path = generatePath(RoutesPaths.calendar, { spaceId });
		navigate(path);
		setLastSelectedSpaceId(spaceId);
	};

	return (
		<Select
			size={'sm'}
			items={spaces || []}
			isLoading={isSpacesLoading}
			onSelectionChange={(selected) => {
				const currentKey = selected.currentKey;
				handleSelectSpace(typeof currentKey === 'string' ? currentKey : undefined);
			}}
			selectedKeys={resolvedSpaceId ? [resolvedSpaceId] : []}
			className={'max-w-xs'}
		>
			{(space) => <SelectItem key={space.id}>{space.name}</SelectItem>}
		</Select>
	);
};
