import { useNavigate } from 'react-router-dom';
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';

import { RoutesPaths } from 'shared/configs';

export const WelcomeNavbar = () => {
	const navigate = useNavigate();

	const handleNavigateToLoginPage = () => {
		navigate(RoutesPaths.loginWithTelegram);
	};

	return (
		<Navbar
			maxWidth="xl"
			isBordered
			className="border-b border-white/70 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/55"
		>
			<NavbarBrand>
				<div className="mr-2 h-6 w-6 rounded-md bg-[linear-gradient(180deg,#0f172a_0%,#334155_100%)]" />
				<span className="select-none text-base font-semibold tracking-tight text-neutral-900">
					centry.
				</span>
			</NavbarBrand>

			<NavbarContent className="hidden gap-6 sm:flex" justify="center">
				<NavbarItem>
					<Link href="#about" color="foreground" className="text-neutral-700">
						Что это
					</Link>
				</NavbarItem>

				<NavbarItem>
					<Link href="#features" color="foreground" className="text-neutral-700">
						Что работает
					</Link>
				</NavbarItem>

				<NavbarItem>
					<Link href="#alpha" color="foreground" className="text-neutral-700">
						Alpha
					</Link>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem className="hidden sm:flex">
					<Button variant="flat" onPress={handleNavigateToLoginPage} color={'primary'}>
						Войти через Telegram
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};
