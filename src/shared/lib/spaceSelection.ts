import { LAST_SELECTED_SPACE_ID } from '../const';

type SpaceWithId = {
	id: string;
};

type ResolveSpaceIdProps = {
	spaces?: SpaceWithId[];
	preferredSpaceId?: string | null;
};

const hasWindow = typeof window !== 'undefined';

const isSpaceInList = (spaceId: string, spaces: SpaceWithId[]) => {
	return spaces.some((space) => space.id === spaceId);
};

export const getLastSelectedSpaceId = () => {
	if (!hasWindow) return null;
	return localStorage.getItem(LAST_SELECTED_SPACE_ID);
};

export const setLastSelectedSpaceId = (spaceId: string) => {
	if (!hasWindow) return;
	localStorage.setItem(LAST_SELECTED_SPACE_ID, spaceId);
};

export const clearLastSelectedSpaceId = () => {
	if (!hasWindow) return;
	localStorage.removeItem(LAST_SELECTED_SPACE_ID);
};

export const removeLastSelectedSpaceIdIfMatches = (spaceId: string) => {
	const selectedSpaceId = getLastSelectedSpaceId();
	if (selectedSpaceId !== spaceId) return;

	clearLastSelectedSpaceId();
};

export const resolveSpaceId = (props: ResolveSpaceIdProps) => {
	const { spaces = [], preferredSpaceId } = props;

	if (!spaces.length) return;

	if (preferredSpaceId && isSpaceInList(preferredSpaceId, spaces)) {
		return preferredSpaceId;
	}

	const selectedSpaceId = getLastSelectedSpaceId();
	if (selectedSpaceId && isSpaceInList(selectedSpaceId, spaces)) {
		return selectedSpaceId;
	}

	return spaces[0].id;
};
