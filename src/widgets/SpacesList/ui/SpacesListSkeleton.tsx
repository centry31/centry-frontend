import { Card, CardBody, Skeleton } from '@heroui/react';

export const SpacesListSkeleton = () => {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: 6 }).map((_, i) => (
				<Card key={i} className="border border-neutral-200">
					<CardBody>
						<Skeleton className="h-6 w-40 rounded-md" />
						<Skeleton className="mt-3 h-4 w-56 rounded-md" />

						<div className="mt-6 flex gap-2">
							<Skeleton className="h-9 w-24 rounded-lg" />
							<Skeleton className="h-9 w-20 rounded-lg" />
						</div>
					</CardBody>
				</Card>
			))}
		</div>
	);
};
