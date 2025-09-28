export type CreateSpaceInviteCodeFormValues = {
	maxUses: number;
	expiresAt: string;
};

export type CreateSpaceInviteCodePayload = CreateSpaceInviteCodeFormValues & {
	spaceId: string;
};
