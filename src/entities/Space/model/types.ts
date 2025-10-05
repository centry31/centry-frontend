import type { User } from 'entities/User';

type Access = 'owner' | 'member';

export type Space = {
	id: string;
	name: string;
	description?: string;

	hasActiveTgChats?: boolean;
	access: Access;

	// TODO: add createdBy field (User)
};

export type SpaceMember = User;

export type CreateSpace = Omit<Space, 'id' | 'access'>;
export type UpdateSpace = Omit<Space, 'id' | 'access'>;
