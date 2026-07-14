"use client";

import * as React from "react";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { Shield, BarChart3, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DemoMain() {
  const handleReset = () => {
    try {
      localStorage.removeItem("cookie_preferences");
      localStorage.removeItem("cookie_consent_given");
      window.location.reload();
    } catch (error) {
      console.error("Error resetting cookies:", error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-center mb-4">
        <Button onClick={handleReset} size="sm">
          Reset Example Cookie Preferences
        </Button>
      </div>

      {/* Cookie Consent with ALL props demonstrated */}
      <CookieConsent
        className="custom-cookie-banner" // Custom CSS class

        cookiePolicyUrl="/privacy-policy" // Custom cookie policy URL

        // Custom categories with icons
        categories={[
          {
            id: "essential",
            name: "Essential Cookies",
            description: "Required for core website functionality, security, and basic operations. These cannot be disabled.",
            icon: <Shield className="h-4 w-4 text-green-600" />,
            isEssential: true, // OPTIONAL TO MAKE CATEGORY STAY TRUE
          },
          {
            id: "analytics",
            name: "Analytics & Performance",
            description: "Help us understand how visitors interact with our website by collecting anonymous usage data.",
            icon: <BarChart3 className="h-4 w-4 text-blue-600" />,
          },
          {
            id: "marketing",
            name: "Marketing & Advertising",
            description: "Enable personalized ads and marketing content across websites and social platforms.",
            icon: <Target className="h-4 w-4 text-purple-600" />,
          },
        ]}
                
        // Accept callback with detailed logging
        onAccept={(preferences) => {
          console.log('🍪 Cookie preferences breakdown:', {
            essential: preferences[0] ? '✅ Enabled' : '❌ Disabled',
            analytics: preferences[1] ? '✅ Enabled' : '❌ Disabled',
            marketing: preferences[2] ? '✅ Enabled' : '❌ Disabled',
          });
          console.log('💾 Stored in localStorage as JSON array');
          
          // Example: Send to analytics service
          // analytics.track('cookie_consent_given', { preferences });
        }}
        
        // Decline callback
        onDecline={() => {
          console.log('❌ User declined all non-essential cookies');
          console.log('🔒 Only essential cookies are active');
          
          // Example: Track decline event
          // analytics.track('cookie_consent_declined');
        }}
      />
    </div>
  );
}
