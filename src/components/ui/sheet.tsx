'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
	return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
	return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
	return (
		<SheetPrimitive.Overlay
			data-slot="sheet-overlay"
			className={cn(
				'fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm data-[state=open]:animate-[overlayIn_.2s_ease-out]',
				className,
			)}
			{...props}
		/>
	);
}

function SheetContent({
	className,
	children,
	side = 'right',
	showClose = true,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
	side?: 'top' | 'right' | 'bottom' | 'left';
	showClose?: boolean;
}) {
	const motion =
		side === 'right'
			? 'data-[state=open]:animate-[sheetInRight_.35s_cubic-bezier(.22,1,.36,1)]'
			: side === 'left'
				? 'data-[state=open]:animate-[sheetInLeft_.35s_cubic-bezier(.22,1,.36,1)]'
				: side === 'top'
					? 'data-[state=open]:animate-[sheetInTop_.35s_cubic-bezier(.22,1,.36,1)]'
					: 'data-[state=open]:animate-[sheetInBottom_.35s_cubic-bezier(.22,1,.36,1)]';

	return (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content
				data-slot="sheet-content"
				className={cn(
					'bg-surface text-ink fixed z-50 flex flex-col gap-4 shadow-xl',
					motion,
					side === 'right' &&
						'inset-y-0 right-0 h-full w-4/5 border-l border-line sm:max-w-sm',
					side === 'left' &&
						'inset-y-0 left-0 h-full w-4/5 border-r border-line sm:max-w-sm',
					side === 'top' && 'inset-x-0 top-0 h-auto border-b border-line',
					side === 'bottom' && 'inset-x-0 bottom-0 h-auto border-t border-line',
					className,
				)}
				{...props}
			>
				{children}
				{showClose && (
					<SheetPrimitive.Close className="absolute top-5 right-5 rounded-full p-1 text-ink-400 transition-colors hover:bg-surface-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 disabled:pointer-events-none">
						<XIcon className="size-4" />
						<span className="sr-only">Close</span>
					</SheetPrimitive.Close>
				)}
			</SheetPrimitive.Content>
		</SheetPortal>
	);
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="sheet-header"
			className={cn('flex flex-col gap-1 border-b border-line p-5', className)}
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn('mt-auto flex flex-col gap-2 border-t border-line p-5', className)}
			{...props}
		/>
	);
}

function SheetTitle({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn('text-base font-medium text-ink', className)}
			{...props}
		/>
	);
}

function SheetDescription({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn('text-sm text-ink-500', className)}
			{...props}
		/>
	);
}

export {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};
