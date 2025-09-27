import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
	Button,
	Link,
	Navbar as NavbarUI,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@heroui/react';

import { SpaceSelect } from '../SpaceSelect/SpaceSelect';

type MenuItem = {
	title: string;
	// TODO: add types from router config
	to: string;
};

const MENU_ITEMS: MenuItem[] = [
	{ title: 'Пространства', to: '/spaces' },
	{ title: 'Календарь', to: '/calendar' },
];

export const NavbarAuth = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navigate = useNavigate();

	const handleToggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const handleLinkClick = (item: MenuItem) => {
		navigate(item.to);
		setIsMenuOpen(false);
	};

	return (
		<NavbarUI onMenuOpenChange={handleToggleMenu} isMenuOpen={isMenuOpen}>
			<NavbarContent justify={'start'}>
				<NavbarMenuToggle aria-label={'Open'} className="sm:hidden" />

				<SpaceSelect />
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{MENU_ITEMS.map((item) => (
					<NavbarItem key={item.to}>
						<Link onPress={() => handleLinkClick(item)}>{item.title}</Link>
					</NavbarItem>
				))}
			</NavbarContent>

			<NavbarContent justify={'end'}>
				<Button size={'sm'} as={Link} color="primary" href="#" variant="flat">
					Sign Up
				</Button>
			</NavbarContent>

			<NavbarMenu>
				{MENU_ITEMS.map((item) => (
					<NavbarMenuItem key={item.to}>
						<Link onPress={() => handleLinkClick(item)}>{item.title}</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</NavbarUI>
	);
};
