import {
	Button,
	Link,
	Navbar as NavbarUI,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuToggle,
} from '@heroui/react';

export const Navbar = () => {
	return (
		<NavbarUI>
			<NavbarContent>
				<NavbarMenuToggle aria-label={'Open'} className="sm:hidden" />

				<NavbarBrand>
					<p className="font-bold text-inherit">unishare.</p>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<Link color="foreground" href="#">
						Features
					</Link>
				</NavbarItem>

				<NavbarItem isActive>
					<Link aria-current="page" href="#">
						Customers
					</Link>
				</NavbarItem>

				<NavbarItem>
					<Link color="foreground" href="#">
						Integrations
					</Link>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<Link href="#">Login</Link>
				</NavbarItem>

				<NavbarItem>
					<Button size={'sm'} as={Link} color="primary" href="#" variant="flat">
						Sign Up
					</Button>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu></NavbarMenu>
		</NavbarUI>
	);
};
