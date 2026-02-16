type SpaceTgChatType = 'private' | 'group' | 'supergroup' | 'channel';

type SpaceTgChat = {
	id: string;
	chatType: SpaceTgChatType;
	chatTitle?: string;
	messageThreadId?: number;
	isActive: boolean;
	createdAt: string; // ISO
};

export { SpaceTgChat };
