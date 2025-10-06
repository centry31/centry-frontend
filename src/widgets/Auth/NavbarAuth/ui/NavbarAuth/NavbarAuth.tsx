import type { ReactNode } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	Link,
	Navbar as NavbarUI,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@heroui/react';
import classNames from 'classnames';
import { CalendarDays, LayoutGrid } from 'lucide-react';

import { RoutesPaths } from 'shared/configs';

import { SpaceSelect } from '../SpaceSelect/SpaceSelect';
import { UserDropdown } from '../UserDropdown/UserDropdown';

type MenuItem = {
	title: string;
	to: string;
	Icon: ReactNode;
};

const MENU_ITEMS: MenuItem[] = [
	{ title: 'Пространства', to: RoutesPaths.spaces, Icon: <LayoutGrid size={16} /> },
	{ title: 'Календарь', to: RoutesPaths.calendar, Icon: <CalendarDays size={16} /> },
];

export const NavbarAuth = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
	const handleLinkClick = (item: MenuItem) => {
		navigate(item.to);
		setIsMenuOpen(false);
	};

	const isActive = (path: string) => location.pathname.startsWith(path);
	const isCalendarPage = isActive(RoutesPaths.calendar);

	return (
		<NavbarUI
			maxWidth="xl"
			onMenuOpenChange={handleToggleMenu}
			isMenuOpen={isMenuOpen}
			className="border-b border-neutral-200 bg-background/70 backdrop-blur-md"
		>
			{/* ЛЕВАЯ ЗОНА */}
			<NavbarContent justify="start" className="gap-2">
				<NavbarMenuToggle aria-label="Открыть меню" className="sm:hidden" />

				{/* SpaceSelect показываем только на календаре */}
				{isCalendarPage && <SpaceSelect />}
			</NavbarContent>

			{/* ЦЕНТР — десктопная навигация */}
			<NavbarContent className="hidden gap-4 sm:flex" justify="center">
				{MENU_ITEMS.map(({ to, title, Icon }) => {
					const active = isActive(to);

					return (
						<NavbarItem key={to} isActive={active} className="relative">
							<Link
								onPress={() => handleLinkClick({ to, title, Icon })}
								className={classNames(
									'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-opacity',
									active && 'text-primary',
									!active && 'text-foreground/80 hover:text-foreground',
								)}
								aria-current={active ? 'page' : undefined}
							>
								{Icon}
								<span className="leading-none">{title}</span>
							</Link>

							{/* Акцентная полоска под активным пунктом */}
							{active && (
								<span className="absolute -bottom-2 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-primary" />
							)}
						</NavbarItem>
					);
				})}
			</NavbarContent>

			{/* ПРАВАЯ ЗОНА */}
			<NavbarContent justify="end" className="gap-2">
				<UserDropdown />
			</NavbarContent>

			{/* МОБИЛЬНОЕ МЕНЮ */}
			<NavbarMenu className="pt-2">
				{MENU_ITEMS.map((item) => {
					const { title, to, Icon } = item;
					const active = isActive(to);

					return (
						<NavbarMenuItem key={to} isActive={active}>
							<Link
								onPress={() => handleLinkClick(item)}
								className={classNames(
									'flex items-center gap-3 rounded-md px-1 py-2 text-base',
									active && 'text-primary',
									!active && 'text-foreground',
								)}
							>
								{Icon}
								<span>{title}</span>
							</Link>
						</NavbarMenuItem>
					);
				})}
			</NavbarMenu>
		</NavbarUI>
	);
};
