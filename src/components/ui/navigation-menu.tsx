import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ArrowRightIcon, ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { GridCard } from '@/components/ui/grid-card';

type NavItemType = {
	title: string;
	href: string;
	description?: string;
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function NavigationMenu({
	className,
	children,
	viewport = true,
	viewportClassName,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
	viewport?: boolean;
	viewportClassName?: string;
}) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			data-viewport={viewport}
			className={cn(
				'group/navigation-menu flex max-w-max flex-1 items-center justify-center',
				className,
			)}
			{...props}
		>
			{children}
			{viewport && <NavigationMenuViewport className={viewportClassName} />}
		</NavigationMenuPrimitive.Root>
	);
}

function NavigationMenuList({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn(
				'group flex flex-1 list-none items-center justify-center gap-1',
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuItem({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
	return (
		<NavigationMenuPrimitive.Item
			data-slot="navigation-menu-item"
			className={cn('relative', className)}
			{...props}
		/>
	);
}

function NavigationMenuTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(
				'inline-flex w-max items-center justify-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink-600 outline-none transition-colors hover:bg-surface-subtle hover:text-ink focus-visible:ring-2 focus-visible:ring-brand-500/30 data-[state=open]:bg-surface-subtle data-[state=open]:text-ink disabled:pointer-events-none disabled:opacity-50',
				className,
			)}
			{...props}
		>
			{children}{' '}
			<ChevronDownIcon
				className="relative top-[1px] size-3.5 transition duration-300 group-data-[state=open]:rotate-180"
				aria-hidden="true"
			/>
		</NavigationMenuPrimitive.Trigger>
	);
}

function NavigationMenuContent({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(
				'top-0 left-0 w-full md:absolute md:w-auto',
				'data-[state=open]:animate-[popIn_.2s_cubic-bezier(.22,1,.36,1)]',
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuViewport({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
	return (
		<div className="absolute top-full left-0 isolate z-50 flex justify-center">
			<NavigationMenuPrimitive.Viewport
				data-slot="navigation-menu-viewport"
				className={cn(
					'origin-top relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-xl data-[state=open]:animate-[popIn_.2s_cubic-bezier(.22,1,.36,1)] md:w-[var(--radix-navigation-menu-viewport-width)]',
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function NavigationMenuLink({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				'flex flex-col justify-center gap-1 rounded-lg px-4 py-2 text-sm text-ink-600 outline-none transition-colors hover:bg-surface-subtle hover:text-ink data-[active=true]:bg-surface-subtle data-[active=true]:text-ink [&_svg:not([class*=size-])]:size-4',
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuIndicator({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
	return (
		<NavigationMenuPrimitive.Indicator
			data-slot="navigation-menu-indicator"
			className={cn(
				'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
				className,
			)}
			{...props}
		>
			<div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-line-strong shadow-sm" />
		</NavigationMenuPrimitive.Indicator>
	);
}

function NavGridCard({
	link,
	...props
}: React.ComponentProps<'div'> & {
	link: NavItemType;
}) {
	return (
		<NavigationMenuPrimitive.Link asChild>
			<GridCard {...props}>
				{link.icon && <link.icon className="relative size-5 text-brand-600" />}
				<div className="relative">
					<span className="text-sm font-medium text-ink">{link.title}</span>
					{link.description && (
						<p className="mt-2 text-xs text-ink-500">{link.description}</p>
					)}
				</div>
			</GridCard>
		</NavigationMenuPrimitive.Link>
	);
}

function NavSmallItem({
	item,
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & {
	item: Omit<NavItemType, 'description'>;
}) {
	return (
		<NavigationMenuLink
			className={cn(
				'group relative h-max flex-row items-center gap-x-3 px-2 py-2',
				className,
			)}
			{...props}
		>
			{item.icon && <item.icon />}
			<p className="text-sm">{item.title}</p>
			<div className="relative ml-auto flex h-full w-4 items-center">
				<ArrowRightIcon className="size-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
			</div>
		</NavigationMenuLink>
	);
}

function NavLargeItem({
	link,
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & {
	link: NavItemType;
}) {
	return (
		<NavigationMenuLink
			className={cn(
				'group relative flex flex-col justify-center border border-line bg-surface p-0',
				className,
			)}
			{...props}
		>
			<div className="flex items-center justify-between px-5 py-4">
				<div className="space-y-1">
					<span className="text-sm font-medium leading-none text-ink">{link.title}</span>
					{link.description && (
						<p className="line-clamp-1 text-xs text-ink-500">
							{link.description}
						</p>
					)}
				</div>
				{link.icon && <link.icon className="size-6 text-ink-400" />}
			</div>
		</NavigationMenuLink>
	);
}

function NavItemMobile({
	item,
	className,
	...props
}: React.ComponentProps<'a'> & {
	item: NavItemType;
}) {
	return (
		<a
			className={cn(
				'group relative flex gap-x-2 rounded-lg p-2 text-sm text-ink-600 outline-none transition-colors hover:bg-surface-subtle hover:text-ink [&_svg:not([class*=size-])]:size-4',
				className,
			)}
			{...props}
		>
			<div className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface-subtle text-brand-600">
				{item.icon && <item.icon />}
			</div>
			<div className="flex h-10 flex-col justify-center">
				<p className="text-sm text-ink">{item.title}</p>
				<span className="line-clamp-1 text-xs leading-snug text-ink-500">
					{item.description}
				</span>
			</div>
		</a>
	);
}

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuIndicator,
	NavigationMenuViewport,
	NavGridCard,
	NavSmallItem,
	NavLargeItem,
	NavItemMobile,
	type NavItemType,
};
