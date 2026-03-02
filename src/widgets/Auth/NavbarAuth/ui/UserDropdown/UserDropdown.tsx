import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@heroui/react';

import { useUserStore } from 'entities/User';

export const UserDropdown = () => {
	const { authData, logout } = useUserStore();

	const handleLogout = () => {
		logout();
	};

	return (
		<Dropdown placement="bottom-start">
			<DropdownTrigger>
				<User
					className={'cursor-pointer'}
					as="button"
					avatarProps={{
						name: authData?.displayName,
					}}
					description={`@${authData?.username}`}
					name={authData?.displayName}
				/>
			</DropdownTrigger>

			<DropdownMenu aria-label="User Actions">
				<DropdownItem
					className={'text-danger'}
					onPress={handleLogout}
					key="logout"
					color="danger"
					variant={'flat'}
				>
					Выйти
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};
