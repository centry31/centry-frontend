import type { User } from 'entities/User';

export type Space = {
	id: string;
	name: string;
	description?: string;

	// TODO: add createdBy field (User)
};

export type SpaceMember = User;

export type CreateSpace = Omit<Space, 'id'>;
export type UpdateSpace = Omit<Space, 'id'>;
