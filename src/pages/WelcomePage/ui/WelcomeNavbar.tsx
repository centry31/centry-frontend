import { useNavigate } from 'react-router-dom';
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';

export const WelcomeNavbar = () => {
	const navigate = useNavigate();

	const handleNavigateToLoginPage = () => {
		navigate('/login');
	};

	return (
		<Navbar
			maxWidth="xl"
			isBordered
			className="backdrop-blur supports-[backdrop-filter]:bg-white/70"
		>
			<NavbarBrand>
				<div className="mr-2 h-6 w-6 rounded-md bg-black" />
				<span className="select-none text-base font-medium tracking-tight">unishare.</span>
			</NavbarBrand>

			<NavbarContent className="hidden gap-6 sm:flex" justify="center">
				<NavbarItem>
					<Link href="#how" color="foreground">
						Как это работает
					</Link>
				</NavbarItem>

				<NavbarItem>
					<Link href="#" color="foreground">
						Фичи
					</Link>
				</NavbarItem>

				<NavbarItem>
					<Link href="#" color="foreground">
						Цены
					</Link>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem className="hidden sm:flex">
					<Button variant="flat" onPress={handleNavigateToLoginPage} color={'primary'}>
						Вход
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};
