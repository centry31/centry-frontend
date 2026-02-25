import type { ReactNode } from 'react';
import { useState } from 'react';
import { generatePath, matchPath, useLocation, useNavigate } from 'react-router-dom';
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

import { useGetUserSpaces } from 'entities/Space';

import { RoutesPaths } from 'shared/configs';
import { resolveSpaceId } from 'shared/lib';

import { SpaceSelect } from '../SpaceSelect/SpaceSelect';
import { UserDropdown } from '../UserDropdown/UserDropdown';

type MenuItem = {
	title: string;
	to: string;
	matchPath: string;
	Icon: ReactNode;
};

export const NavbarAuth = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const { data: userSpaces = [] } = useGetUserSpaces();

	const selectedSpaceId = resolveSpaceId({ spaces: userSpaces });

	const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
	const handleLinkClick = (item: MenuItem) => {
		navigate(item.to);
		setIsMenuOpen(false);
	};

	const isActive = (path: string) =>
		Boolean(matchPath({ path, end: false }, location.pathname));
	const isCalendarPage = isActive(RoutesPaths.calendar);

	const MENU_ITEMS: MenuItem[] = [
		{
			title: 'Пространства',
			to: RoutesPaths.spaces,
			matchPath: RoutesPaths.spaces,
			Icon: <LayoutGrid size={16} />,
		},
		{
			title: 'Календарь',
			to: selectedSpaceId
				? generatePath(RoutesPaths.calendar, { spaceId: selectedSpaceId })
				: RoutesPaths.noSpaces,
			matchPath: RoutesPaths.calendar,
			Icon: <CalendarDays size={16} />,
		},
	];

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
				{MENU_ITEMS.map((props) => {
					const { to, title, Icon, matchPath } = props;

					const active = isActive(matchPath);

					return (
						<NavbarItem key={to} isActive={active} className="relative">
							<Link
								onPress={() => handleLinkClick(props)}
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
					const { title, to, Icon, matchPath } = item;
					const active = isActive(matchPath);

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
