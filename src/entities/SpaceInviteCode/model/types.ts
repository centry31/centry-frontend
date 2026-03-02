type SpaceInviteCode = {
	code: string;
	maxUses: number;
	usedCount: number;
	expiresAt: string; // ISO
};

type CreateSpaceInviteCode = {
	maxUses: number;
	expiresAt: string;
};

export { CreateSpaceInviteCode, SpaceInviteCode };
