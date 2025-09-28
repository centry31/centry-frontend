export const getSpaceInviteLinkUrl = (code: string) => {
	if (!code) return null;

	const host = window.location.origin;
	return `${host}/spaces/join?code=${code}`;
};
