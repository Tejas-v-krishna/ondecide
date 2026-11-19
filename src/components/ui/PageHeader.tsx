import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Consistent editorial page header used across marketing surfaces.
 */
export function PageHeader({ eyebrow, title, description, className, children }: PageHeaderProps) {
  return (
    <div className={cn("mb-12 border-b border-line pb-8", className)}>
      {eyebrow && (
        <span className="mb-4 inline-block text-2xs font-medium uppercase tracking-widest text-brand-700">
          {eyebrow}
        </span>
      )}
      <h1 className="text-display-sm mb-4 font-medium text-ink">{title}</h1>
      {description && (
        <p className="max-w-2xl text-lg text-ink-500">{description}</p>
      )}
      {children}
    </div>
  );
}
