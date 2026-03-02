import { Link } from '@heroui/react';

export const WelcomeFooter = () => {
	return (
		<footer className="border-t border-neutral-200">
			<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-neutral-500 sm:flex-row lg:px-8">
				<p>© {new Date().getFullYear()} Centry.</p>

				<div className="flex items-center gap-6">
					<Link href="#">Политика</Link>
					<Link href="#">Контакты</Link>
				</div>
			</div>
		</footer>
	);
};
