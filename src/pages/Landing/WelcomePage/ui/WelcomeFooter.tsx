import { Link } from '@heroui/react';

import { RoutesPaths } from 'shared/configs';

export const WelcomeFooter = () => {
	return (
		<footer className="border-t border-neutral-200/80 bg-[#fafafa]">
			<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-neutral-500 sm:flex-row lg:px-8">
				<p className="tracking-tight">© {new Date().getFullYear()} centry.</p>

				<div className="flex items-center gap-6">
					<Link href={RoutesPaths.contacts} className="text-neutral-500">
						Контакты
					</Link>
				</div>
			</div>
		</footer>
	);
};
