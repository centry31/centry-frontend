export type SpaceInviteCode = {
	code: string;
	maxUses: number;
	usedCount: number;
	expiresAt: string; // ISO
};
