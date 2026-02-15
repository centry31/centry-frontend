import type { User } from 'entities/User';

type Access = 'owner' | 'member';

type Space = {
	id: string;
	name: string;
	description?: string;

	hasTelegramChats?: boolean;
	access?: Access;

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

export { CreateSpace, Space, SpaceMember, UpdateSpace };
