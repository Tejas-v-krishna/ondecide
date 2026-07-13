"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger);

export default function Template({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // to re-trigger on route changes if necessary

  useGSAP(
    () => {
      // Select top-level sections (excluding those handled by Custom animations like Bento Grid)
      const elements = gsap.utils.toArray(
        "main > section:not(.no-gsap), main .gsap-reveal",
        container.current
      ) as any[];

      // Reset any previous ScrollTriggers to avoid duplicates on route change
      ScrollTrigger.killAll();

      if (elements.length > 0) {
        // Use ScrollTrigger batch to stagger elements as they enter the viewport
        ScrollTrigger.batch(elements, {
          start: "top 90%",
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out",
                clearProps: "transform,opacity", // Allows CSS hover effects to take over after animation
              }
            );
          },
        });
      }
    },
    { scope: container, dependencies: [pathname] }
  );

  return (
    <div ref={container} className="min-h-screen">
      {children}
    </div>
  );
}
