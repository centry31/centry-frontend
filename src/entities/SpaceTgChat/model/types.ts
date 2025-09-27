type SpaceTgChatType = 'private' | 'group' | 'supergroup' | 'channel';

export type SpaceTgChat = {
	id: string;
	chatType: SpaceTgChatType;
	chatTitle?: string;
	messageThreadId?: number;
	isActive: boolean;
	createdAt: string; // ISO
};
