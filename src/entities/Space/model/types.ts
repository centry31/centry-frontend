import type { User } from 'entities/User';

type SpaceAccess = 'owner' | 'member';

type Space = {
	id: string;
	name: string;
	description?: string;

	hasTelegramChats?: boolean;
	access: SpaceAccess;

	// TODO: add createdBy field (User)
};

type CreateSpace = {
	name: string;
	description: string;
};

type UpdateSpace = {
	name: string;
	description?: string;
};

type SpaceMember = User;

export { CreateSpace, Space, SpaceAccess, SpaceMember, UpdateSpace };
