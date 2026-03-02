import { Navbar, NavbarBrand } from '@heroui/react';

export const NavbarGuest = () => {
	return (
		<Navbar maxWidth="xl" isBordered>
			<NavbarBrand>
				<div className="mr-2 h-6 w-6 rounded-md bg-black" />
				<span className="select-none text-base font-medium tracking-tight">centry.</span>
			</NavbarBrand>
		</Navbar>
	);
};
