export const getSpaceInviteLinkUrl = (code: string, host = window.location.origin) => {
	if (!code) return null;
	return `${host}/invite?code=${code}`;
};
