"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// ─── Data ──────────────────────────────────────────────────────────────
const PIPELINE_STEPS = [
  { id: "resolve", label: "Resolving company" },
  { id: "financials", label: "Pulling financials" },
  { id: "news", label: "Reading news" },
  { id: "qualitative", label: "Qualitative analysis" },
  { id: "historical", label: "Historical patterns" },
  { id: "synthesis", label: "Synthesizing report" },
  { id: "thesis", label: "Forming thesis" },
];

export default function ProductDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Agent Progress Refs
  const agentPhaseRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spinnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const checkRefs = useRef<(SVGSVGElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rowBgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const doneBadgeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Bento Grid Refs
  const reportPhaseRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const bentoGridRef = useRef<HTMLDivElement>(null);
  const companyContentRef = useRef<HTMLDivElement>(null);
  const decisionContentRef = useRef<HTMLDivElement>(null);
  const bullBearContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !companyContentRef.current || !decisionContentRef.current || !bullBearContentRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });

    // ── Reset Initial State ──
    tl.set(agentPhaseRef.current, { opacity: 0, scale: 1, pointerEvents: "auto" })
      .set(reportPhaseRef.current, { opacity: 0, pointerEvents: "none" })
      .set(progressBarRef.current, { width: "0%" })
      .set(subtitleRef.current, { opacity: 0, y: 5 });
    
    // Reset all rows to pending
    PIPELINE_STEPS.forEach((_, i) => {
      tl.set(rowRefs.current[i], { opacity: 0, y: 15 }) // Prep for fade-up stagger
        .set(rowBgRefs.current[i], { backgroundColor: "transparent", borderColor: "transparent" })
        .set(labelRefs.current[i], { color: "#52525b" }) // zinc-600
        .set(dotRefs.current[i], { opacity: 1 })
        .set(spinnerRefs.current[i], { opacity: 0 })
        .set(checkRefs.current[i], { opacity: 0 })
        .set(doneBadgeRefs.current[i], { opacity: 0 });
    });

    // Reset Camera & Bento items
    // Start camera zoomed in on the top-left (Stock info)
    tl.set(cameraRef.current, { scale: 1.35, x: "22%", y: "10%" });
    tl.set(bentoGridRef.current, { opacity: 0 });
    
    // Prep children for staggered fade-up
    const companyChildren = companyContentRef.current.children;
    const decisionChildren = decisionContentRef.current.children;
    const bullBearChildren = bullBearContentRef.current.children;
    
    tl.set([companyChildren, decisionChildren, bullBearChildren], { opacity: 0, y: 15 });
    // Parents start completely hidden to prevent borders/margins from showing early
    tl.set([companyContentRef.current, decisionContentRef.current, bullBearContentRef.current], { opacity: 0, x: 0, y: 0 });

    // ── Animation Sequence ──
    
    // 1. Fade in the agent phase smoothly from black
    tl.to(agentPhaseRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" });
    tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.3");
    
    // 1b. Staggered fade-up entrance for the pipeline rows
    tl.to(rowRefs.current, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, "-=0.2");
    
    // 2. Iterate through steps smoothly
    PIPELINE_STEPS.forEach((_, i) => {
      const nextProgress = ((i + 1) / PIPELINE_STEPS.length) * 100;
      const tStart = `step-${i}`;

      tl.addLabel(tStart)
        // Active State: Just turn on spinner and gently brighten text. NO background flashes.
        .to(labelRefs.current[i], { color: "#d4d4d8", duration: 0.2 }, tStart)
        .to(dotRefs.current[i], { opacity: 0, duration: 0.1 }, tStart)
        .to(spinnerRefs.current[i], { opacity: 1, duration: 0.2 }, tStart)
        // Progress bar
        .to(progressBarRef.current, { width: `${nextProgress}%`, duration: 0.35, ease: "power1.inOut" }, tStart)
        // Hold briefly
        .to({}, { duration: 0.25 })
        // Done State: Just swap spinner for checkmark.
        .to(spinnerRefs.current[i], { opacity: 0, duration: 0.15 })
        .to([checkRefs.current[i], doneBadgeRefs.current[i]], { opacity: 1, duration: 0.2 }, "<");
    });

    // 3. Transition to Report Phase (Crossfade)
    tl.to({}, { duration: 0.2 }) // Short hold
      .to(agentPhaseRef.current, { opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in" })
      .set(agentPhaseRef.current, { pointerEvents: "none" })
      .set(reportPhaseRef.current, { pointerEvents: "auto" })
      .to(reportPhaseRef.current, { opacity: 1, duration: 0.3 }, "-=0.1")
      .to(bentoGridRef.current, { opacity: 1, duration: 0.4 }, "-=0.1");
    
    // 4. Detailed Component Slideshow & Camera Pans
    
    // a. Show Company Details with internal stagger
    tl.set(companyContentRef.current, { opacity: 1 }, "+=0.2");
    tl.to(companyChildren, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }, "<");
    tl.to({}, { duration: 1.0 }); // Hold to let user read
    
    // b. Fade slide to Decision
    tl.addLabel("slide1")
      .to(companyContentRef.current, { opacity: 0, x: -15, duration: 0.4 }, "slide1")
      .to(cameraRef.current, { x: "-20%", y: "20%", duration: 0.8, ease: "power3.inOut" }, "slide1") // Pan to top right
      .set(decisionContentRef.current, { opacity: 1 }, "slide1+=0.4")
      .to(decisionChildren, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }, "slide1+=0.4");
    tl.to({}, { duration: 1.0 }); // Hold
    
    // c. Fade slide to Bull Bear Case
    tl.addLabel("slide2")
      .to(decisionContentRef.current, { opacity: 0, y: -15, duration: 0.4 }, "slide2")
      .to(cameraRef.current, { x: "-20%", y: "-15%", duration: 0.8, ease: "power3.inOut" }, "slide2") // Pan to bottom right
      .set(bullBearContentRef.current, { opacity: 1 }, "slide2+=0.4")
      .to(bullBearChildren, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }, "slide2+=0.4");
    tl.to({}, { duration: 1.0 }); // Hold

    // d. Zoom out and show everything!
    tl.addLabel("zoomOut")
      .to(cameraRef.current, { scale: 0.92, x: "0%", y: "0%", duration: 1.0, ease: "power3.inOut" }, "zoomOut")
      .to([companyContentRef.current, decisionContentRef.current, bullBearContentRef.current], { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power2.out" }, "zoomOut+=0.2");

    // 5. Hold full report on screen, then fade out smoothly to loop
    tl.to({}, { duration: 3.5 })
      .to(reportPhaseRef.current, { opacity: 0, duration: 0.4, ease: "power2.inOut" });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black font-sans text-white selection:bg-zinc-800">
      
      {/* ─────────────────────────────────────────────────────────
          PHASE 1: Agent Progress
          ───────────────────────────────────────────────────────── */}
      <div ref={agentPhaseRef} className="absolute flex w-full max-w-2xl flex-col px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
            <span className="text-sm font-medium text-zinc-300">Researching AAPL</span>
          </div>
          <div ref={subtitleRef} className="min-h-[1.75rem] font-serif text-xl text-white">
            Synthesizing report & forming thesis...
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-zinc-900">
          <div ref={progressBarRef} className="h-full rounded-full bg-white" style={{ width: "0%" }} />
        </div>

        {/* Steps List */}
        <div className="flex flex-col space-y-3">
          {PIPELINE_STEPS.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="flex items-center gap-3 p-3"
            >
              <div
                ref={(el) => { rowBgRefs.current[i] = el; }}
                className="absolute inset-0 -z-10 rounded-lg border border-transparent"
              />
              {/* Step indicator */}
              <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                <div ref={(el) => { dotRefs.current[i] = el; }} className="absolute h-2 w-2 rounded-full bg-zinc-700" />
                <div ref={(el) => { spinnerRefs.current[i] = el; }} className="absolute h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <svg ref={(el) => { checkRefs.current[i] = el; }} className="absolute h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Label */}
              <span ref={(el) => { labelRefs.current[i] = el; }} className="flex-1 text-sm text-zinc-600">
                {step.label}
              </span>

              {/* Badges */}
              {(step.id === "news" || step.id === "financials") && (
                <span className="rounded bg-zinc-900 px-1.5 py-0.5 text-[10px] text-zinc-600">
                  parallel
                </span>
              )}
              <span ref={(el) => { doneBadgeRefs.current[i] = el; }} className="text-xs text-zinc-500">
                done
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          PHASE 2: Final Report (Bento Grid)
          ───────────────────────────────────────────────────────── */}
      <div ref={reportPhaseRef} className="absolute flex w-full justify-center">
        {/* Camera Wrapper */}
        <div ref={cameraRef} className="w-full max-w-[1000px] px-6">
          
          {/* Top Navbar mockup */}
          <div className="mb-6 flex items-center justify-between border-b border-zinc-800/60 pb-4">
            <div className="flex gap-4">
              <div className="h-4 w-20 rounded bg-zinc-800" />
              <div className="h-4 w-24 rounded bg-zinc-800" />
              <div className="h-4 w-16 rounded bg-zinc-800" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-24 rounded-lg bg-zinc-900 border border-zinc-800" />
              <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center">★</div>
            </div>
          </div>

          {/* Bento Grid */}
          <div ref={bentoGridRef} className="grid grid-cols-1 gap-px bg-zinc-800 lg:grid-cols-12 p-px overflow-hidden">
            
            {/* Company Snapshot */}
            <div className="col-span-1 flex flex-col bg-black p-6 lg:col-span-4">
              <div ref={companyContentRef} className="flex h-full flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center">
                      <svg className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.99 15h-1.99v-2h-2v2H10v-2H8v-2h2v-2H8V9h2V7h2v2h2V7h2v2h-2v2h2v2h-2v2h2v2z"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-white">Apple Inc <span className="text-xs font-sans text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded align-middle">AAPL</span></h2>
                      <p className="text-xs text-zinc-500 mt-1">Technology · NASDAQ NMS</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-sans text-xl font-bold text-white">
                      <span className="text-sm text-zinc-500 font-normal">USD</span> 315.32
                    </div>
                    <div className="inline-flex rounded bg-zinc-900 px-1.5 py-0.5 text-xs text-zinc-400 mt-1">
                      ▼ 0.28% (-0.90)
                    </div>
                  </div>
                </div>
                
                <h3 className="font-serif text-sm tracking-widest text-zinc-400 uppercase mb-3">About Apple Inc</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Apple is best known for creating and selling popular electronics like the iPhone, Mac computers, and the Apple Watch. The company makes money both by selling these high-end gadgets and through digital services like the App Store, music subscriptions, and extra phone storage. People care about Apple because it has a massive, loyal customer base that tends to stick with the brand every time they need a new device.
                </p>
                
                <div className="mt-8 flex gap-8">
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Market Cap</p>
                    <p className="text-sm font-medium text-white">$4.63M</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Website</p>
                    <p className="text-sm font-medium text-emerald-400">apple.com ↗</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Thesis */}
            <div className="col-span-1 flex flex-col bg-black p-6 lg:col-span-8">
              
              {/* The Decision Component */}
              <div ref={decisionContentRef}>
                <div className="flex gap-5 mb-8">
                  <div className="h-16 w-16 rounded-xl border border-zinc-800 bg-zinc-900 flex flex-col items-center justify-center shrink-0">
                    <div className="h-4 w-4 bg-zinc-400 mb-1 rounded-sm" />
                    <span className="text-xs font-bold text-white">Hold</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white mb-1">The Decision</h3>
                    <p className="text-sm text-zinc-400 mb-3">Mixed signals — monitor and revisit</p>
                    <p className="text-sm text-zinc-200 leading-relaxed">
                      Apple is a world-class company with an incredibly loyal customer base, but the stock is currently very expensive while its actual sales growth has started to slow down. While the company&apos;s move into high-profit digital services and its massive stock buybacks are great signs, the high price tag makes it a risky time for new investors to jump in.
                    </p>
                  </div>
                </div>

                <h4 className="font-serif text-xs text-zinc-400 uppercase tracking-widest mb-4">How this call was weighted</h4>
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>Financials</span>
                    <span>35%</span>
                  </div>
                  <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-zinc-500 w-[35%]" />
                  </div>
                </div>
              </div>

              {/* Bull Bear Case Component */}
              <div ref={bullBearContentRef} className="grid grid-cols-2 gap-8 mt-auto border-t border-zinc-800/60 pt-6">
                <div>
                  <h4 className="font-serif text-sm text-emerald-400 uppercase tracking-widest mb-3">The Bull Case</h4>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    <li className="flex gap-2">
                      <span className="text-emerald-400">+</span> Massive $110 billion share buyback program
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400">+</span> Strong shift toward high-margin digital services
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400">+</span> Positive technical momentum with a &apos;Golden Cross&apos; signal
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif text-sm text-rose-400 uppercase tracking-widest mb-3">The Bear Case</h4>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    <li className="flex gap-2">
                      <span className="text-rose-400">-</span> High stock price relative to actual company earnings
                    </li>
                    <li className="flex gap-2">
                      <span className="text-rose-400">-</span> Slowing growth in hardware sales like the iPhone
                    </li>
                    <li className="flex gap-2">
                      <span className="text-rose-400">-</span> Loss of market share to local competitors in China
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
