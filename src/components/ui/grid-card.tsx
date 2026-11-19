import React from 'react';
import { cn } from '@/lib/utils';
import { GridPattern } from '@/components/ui/grid-pattern';

export function GridCard({
	className,
	children,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'group relative isolate z-0 flex h-full flex-col justify-between overflow-hidden rounded-xl border border-line bg-surface px-5 py-4 transition-colors duration-150 hover:border-line-strong',
				className,
			)}
			{...props}
		>
			<div className="absolute inset-0">
				<div className="absolute -inset-[25%] -skew-y-12 [mask-image:linear-gradient(225deg,black,transparent)]">
					<GridPattern
						width={30}
						height={30}
						x={0}
						y={0}
						squares={getRandomPattern(5)}
						className="fill-brand-500/[0.06] stroke-line absolute inset-0 size-full translate-y-2 transition-transform duration-150 ease-out group-hover:translate-y-0"
					/>
				</div>
			</div>
			<div className="relative z-10 flex h-full flex-col justify-between">
				{children}
			</div>
		</div>
	);
}

function getRandomPattern(length?: number): [x: number, y: number][] {
	length = length ?? 5;
	return Array.from({ length }, () => [
		Math.floor(Math.random() * 4) + 7,
		Math.floor(Math.random() * 6) + 1,
	]);
}
