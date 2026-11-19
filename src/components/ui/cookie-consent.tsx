"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CookieIcon, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// --------------------------------
// Types and Interfaces
// --------------------------------

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
  isEssential?: boolean;
}

interface CookiePreferences {
  [key: string]: boolean;
}

// --------------------------------
// Default Configurations
// --------------------------------

const DEFAULT_COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: "essential",
    name: "Essential Cookies",
    description: "Required for core website functionality, such as navigation and security.",
    isEssential: true,
  },
  {
    id: "analytics",
    name: "Analytics Cookies",
    description: "Track anonymous usage to improve our services.",
  },
  {
    id: "marketing",
    name: "Marketing Cookies",
    description: "Enable personalized ads across websites.",
  },
];

const STORAGE_KEY = "cookie_preferences";
const CONSENT_KEY = "cookie_consent_given";

// --------------------------------
// Main Component
// --------------------------------

interface CookieConsentProps {
  className?: string;
  categories?: CookieCategory[];
  cookiePolicyUrl?: string;
  onAccept?: (preferences: boolean[]) => void;
  onDecline?: () => void;
}

function CookieConsent({
  className,
  categories = DEFAULT_COOKIE_CATEGORIES,
  cookiePolicyUrl = "/cookies",
  onAccept,
  onDecline,
}: CookieConsentProps) {
  const [mounted, setMounted] = React.useState(false);
  const [showBanner, setShowBanner] = React.useState(false);
  const [showCustomizeDialog, setShowCustomizeDialog] = React.useState(false);

  const [preferences, setPreferences] = React.useState<boolean[]>(() =>
    categories.map((cat) => !!cat.isEssential)
  );

  React.useEffect(() => {
    setMounted(true);

    try {
      const consentGiven = localStorage.getItem(CONSENT_KEY) === "true";
      const storedPrefs = localStorage.getItem(STORAGE_KEY);

      if (consentGiven && storedPrefs) {
        const parsedPrefs = JSON.parse(storedPrefs) as boolean[];
        if (Array.isArray(parsedPrefs) && parsedPrefs.length === categories.length) {
          setPreferences(parsedPrefs);
          onAccept?.(parsedPrefs);
          return;
        }
      }

      setShowBanner(true);
    } catch (error) {
      console.error("Error reading cookie preferences:", error);
      setShowBanner(true);
    }
  }, [categories.length, onAccept]);

  const savePreferences = React.useCallback((prefs: boolean[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      localStorage.setItem(CONSENT_KEY, "true");
    } catch (error) {
      console.error("Error saving cookie preferences:", error);
    }

    setShowBanner(false);
    setShowCustomizeDialog(false);
    onAccept?.(prefs);
  }, [onAccept]);

  const handleAcceptAll = React.useCallback(() => {
    const allTrue = categories.map(() => true);
    setPreferences(allTrue);
    savePreferences(allTrue);
  }, [categories, savePreferences]);

  const handleRejectAll = React.useCallback(() => {
    const essentialOnly = categories.map((cat) => !!cat.isEssential);
    setPreferences(essentialOnly);
    savePreferences(essentialOnly);
    onDecline?.();
  }, [categories, savePreferences, onDecline]);

  const handleSaveCustom = React.useCallback(() => {
    savePreferences(preferences);
  }, [preferences, savePreferences]);

  const handleToggle = React.useCallback((index: number, checked: boolean) => {
    if (categories[index]?.isEssential) return;

    setPreferences((prev) => {
      const newPrefs = [...prev];
      newPrefs[index] = checked;
      return newPrefs;
    });
  }, [categories]);

  if (!mounted) return null;

  return (
    <>
      <CookieBanner
        isVisible={showBanner}
        onAcceptAll={handleAcceptAll}
        onCustomize={() => setShowCustomizeDialog(true)}
        cookiePolicyUrl={cookiePolicyUrl}
        className={className}
      />

      <CookieCustomizeDialog
        open={showCustomizeDialog}
        onOpenChange={setShowCustomizeDialog}
        categories={categories}
        preferences={preferences}
        onToggle={handleToggle}
        onSave={handleSaveCustom}
        onRejectAll={handleRejectAll}
      />
    </>
  );
}

// --------------------------------
// Sub-Components
// --------------------------------

interface CookieBannerProps {
  isVisible: boolean;
  onAcceptAll: () => void;
  onCustomize: () => void;
  cookiePolicyUrl: string;
  className?: string;
}

function CookieBanner({
  isVisible,
  onAcceptAll,
  onCustomize,
  cookiePolicyUrl,
  className,
}: CookieBannerProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 w-full sm:bottom-4 sm:left-4 sm:max-w-md",
            className
          )}
        >
          <div className="m-3 overflow-hidden rounded-2xl border border-line bg-surface font-sans shadow-xl">
            <div className="flex items-center gap-3 p-6 pb-4">
              <div className="rounded-lg border border-line bg-surface-subtle p-2">
                <CookieIcon className="h-5 w-5 text-ink" />
              </div>
              <h2 className="text-lg font-medium text-ink">Cookie Preferences</h2>
            </div>
            <div className="px-6 pb-6">
              <p className="mb-4 text-sm leading-relaxed text-ink-500">
                We use cookies to enhance your experience, personalize content, and analyze traffic.
              </p>
              <Link
                href={cookiePolicyUrl}
                className="group inline-flex items-center text-xs font-medium text-ink-500 transition-colors hover:text-ink"
              >
                Cookie Policy
                <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="flex flex-col gap-3 border-t border-line bg-surface-subtle/50 p-4 sm:flex-row">
              <button
                onClick={onAcceptAll}
                className="h-9 w-full cursor-pointer rounded-full bg-ink text-sm font-medium text-white transition-colors hover:bg-ink-800 sm:flex-1"
              >
                Accept All
              </button>
              <button
                onClick={onCustomize}
                className="h-9 w-full cursor-pointer rounded-full border border-line bg-surface text-sm font-medium text-ink-600 transition-colors hover:bg-surface-subtle hover:text-ink sm:flex-1"
              >
                Customize
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface CookieCustomizeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: CookieCategory[];
  preferences: boolean[];
  onToggle: (index: number, checked: boolean) => void;
  onSave: () => void;
  onRejectAll: () => void;
}

function CookieCustomizeDialog({
  open,
  onOpenChange,
  categories,
  preferences,
  onToggle,
  onSave,
  onRejectAll,
}: CookieCustomizeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[200] gap-0 p-0 sm:max-w-[500px]">
        <DialogHeader className="border-b border-line p-6 pb-4">
          <DialogTitle className="text-xl font-medium text-ink">Manage Cookies</DialogTitle>
          <DialogDescription className="mt-1 text-sm text-ink-500">
            Customize your cookie preferences below.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[calc(100vh-250px)] space-y-4 overflow-y-auto px-6 py-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={cn(
                "rounded-xl border p-4 transition-all duration-200",
                preferences[index]
                  ? "border-brand-200 bg-brand-50/50"
                  : "border-line bg-surface hover:border-line-strong"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "rounded-lg border p-2 transition-colors",
                      preferences[index]
                        ? "border-brand-200 bg-surface text-brand-700"
                        : "border-transparent bg-surface-subtle text-ink-400"
                    )}
                  >
                    {category.icon || <CookieIcon className="h-4 w-4" />}
                  </div>
                  <Label
                    htmlFor={`cookie-${index}`}
                    className="flex cursor-pointer items-center text-base font-medium text-ink"
                  >
                    {category.name}
                    {category.isEssential && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="ml-2 inline-flex items-center rounded-full border border-line bg-surface-subtle px-2 py-0.5 text-2xs font-medium text-ink-500">
                              Required
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">These cookies cannot be disabled.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </Label>
                </div>
                <Switch
                  id={`cookie-${index}`}
                  checked={preferences[index] || false}
                  onCheckedChange={(checked) => onToggle(index, checked)}
                  disabled={category.isEssential}
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                {category.description}
              </p>
            </motion.div>
          ))}
        </div>
        <DialogFooter className="border-t border-line bg-surface-subtle/50 p-6">
          <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={onRejectAll}
              className="h-9 w-full cursor-pointer rounded-full border border-line bg-surface text-sm font-medium text-ink-600 transition-colors hover:bg-surface-subtle hover:text-ink sm:w-[120px]"
            >
              Reject All
            </button>
            <button
              onClick={onSave}
              className="h-9 w-full cursor-pointer rounded-full bg-ink text-sm font-medium text-white transition-colors hover:bg-ink-800 sm:w-[150px]"
            >
              Save Preferences
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --------------------------------
// Exports
// --------------------------------

export { CookieConsent };
export type { CookieCategory, CookieConsentProps, CookiePreferences };
