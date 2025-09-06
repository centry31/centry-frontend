export type Space = {
	id: string;
	name: string;
	description?: string;

	// TODO: add createdBy field (User)
};

export type CreateSpace = Omit<Space, 'id'>;
