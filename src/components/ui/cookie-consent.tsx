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
  
  // Simple boolean array - index matches category index
  const [preferences, setPreferences] = React.useState<boolean[]>(() => 
    categories.map(cat => !!cat.isEssential)
  );

  // Check if consent was already given
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
      
      // No valid consent found, show banner
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
    const essentialOnly = categories.map(cat => !!cat.isEssential);
    setPreferences(essentialOnly);
    savePreferences(essentialOnly);
    onDecline?.();
  }, [categories, savePreferences, onDecline]);

  const handleSaveCustom = React.useCallback(() => {
    savePreferences(preferences);
  }, [preferences, savePreferences]);

  const handleToggle = React.useCallback((index: number, checked: boolean) => {
    if (categories[index]?.isEssential) return; // Can't toggle essential cookies
    
    setPreferences(prev => {
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
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            "fixed bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 z-50 w-full sm:max-w-md",
            className
          )}
        >
          <div className="m-3 bg-zinc-950/95 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden font-sans">
            <div className="flex items-center gap-3 p-6 pb-4">
              <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg">
                <CookieIcon className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-serif font-semibold text-white">Cookie Preferences</h2>
            </div>
            <div className="px-6 pb-6">
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                We use cookies to enhance your experience, personalize content, and analyze traffic.
              </p>
              <Link
                href={cookiePolicyUrl}
                className="text-xs inline-flex items-center text-zinc-400 hover:text-white transition-colors group font-medium"
              >
                Cookie Policy
                <ChevronRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="p-4 flex flex-col sm:flex-row gap-3 border-t border-zinc-800/80 bg-zinc-900/10">
              <button
                onClick={onAcceptAll}
                className="w-full sm:flex-1 h-9 rounded-lg text-sm font-medium bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Accept All
              </button>
              <button
                onClick={onCustomize}
                className="w-full sm:flex-1 h-9 rounded-lg text-sm font-medium border border-zinc-800 bg-black hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors cursor-pointer"
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
      <DialogContent className="bg-zinc-950/95 border border-zinc-800 z-[200] sm:max-w-[500px] p-0 gap-0 shadow-2xl font-sans text-white">
        <DialogHeader className="p-6 pb-4 border-b border-zinc-800/80">
          <DialogTitle className="text-xl font-serif font-semibold text-white">Manage Cookies</DialogTitle>
          <DialogDescription className="text-zinc-400 text-sm mt-1">
            Customize your cookie preferences below.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-6 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto bg-zinc-950">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={cn(
                "p-4 border rounded-xl transition-all duration-200",
                preferences[index] 
                  ? "border-zinc-700 bg-zinc-900/30 shadow-sm" 
                  : "border-zinc-800 bg-black hover:border-zinc-700"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg transition-colors border",
                    preferences[index] ? "bg-zinc-900 border-zinc-800 text-white" : "bg-zinc-900/50 border-transparent text-zinc-500"
                  )}>
                    {category.icon || <CookieIcon className="h-4 w-4" />}
                  </div>
                  <Label
                    htmlFor={`cookie-${index}`}
                    className="font-semibold text-base cursor-pointer text-white flex items-center"
                  >
                    {category.name}
                    {category.isEssential && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-semibold bg-zinc-800 border border-zinc-700 text-zinc-300">
                              Required
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="bg-zinc-900 border border-zinc-800 text-zinc-300">
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
              <p className="text-sm mt-3 text-zinc-400 leading-relaxed">
                {category.description}
              </p>
            </motion.div>
          ))}
        </div>
        <DialogFooter className="p-6 border-t border-zinc-800/80 bg-zinc-900/10">
          <div className="flex w-full flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button 
              onClick={onRejectAll} 
              className="w-full sm:w-[120px] h-9 rounded-lg text-sm font-medium border border-zinc-800 bg-black hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              Reject All
            </button>
            <button 
              onClick={onSave} 
              className="w-full sm:w-[140px] h-9 rounded-lg text-sm font-medium bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer"
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
