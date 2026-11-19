"use client";

import { useRef, useState, useEffect } from "react";
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

interface ProductDemoProps {
  className?: string;
}

export default function ProductDemo({ className = "h-screen w-full" }: ProductDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

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

  // Handle auto-scaling for responsive embedding
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      if (width < 1024) {
        setScale(width / 1024);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });

    // ── Reset Initial State ──
    tl.set(agentPhaseRef.current, { opacity: 0, scale: 1, pointerEvents: "auto" })
      .set(reportPhaseRef.current, { opacity: 0, pointerEvents: "none" })
      .set(progressBarRef.current, { width: "0%" })
      .set(subtitleRef.current, { opacity: 0, y: 5 });

    PIPELINE_STEPS.forEach((_, i) => {
      tl.set(rowRefs.current[i], { opacity: 0, y: 15 })
        .set(rowBgRefs.current[i], { backgroundColor: "transparent", borderColor: "transparent" })
        .set(labelRefs.current[i], { color: "#94a3b8" }) // ink-400
        .set(dotRefs.current[i], { opacity: 1 })
        .set(spinnerRefs.current[i], { opacity: 0 })
        .set(checkRefs.current[i], { opacity: 0 })
        .set(doneBadgeRefs.current[i], { opacity: 0 });
    });

    // Reset Camera & Bento items
    tl.set(cameraRef.current, { scale: 1.35, x: "22%", y: "10%" });
    tl.set(bentoGridRef.current, { opacity: 0 });

    const companyChildren = companyContentRef.current ? Array.from(companyContentRef.current.children) : [];
    const decisionChildren = decisionContentRef.current ? Array.from(decisionContentRef.current.children) : [];
    const bullBearChildren = bullBearContentRef.current ? Array.from(bullBearContentRef.current.children) : [];

    tl.set([...companyChildren, ...decisionChildren, ...bullBearChildren], { opacity: 0, y: 15 });
    tl.set([companyContentRef.current, decisionContentRef.current, bullBearContentRef.current], { opacity: 0, x: 0, y: 0 });

    // ── Animation Sequence ──

    tl.to(agentPhaseRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" });
    tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.3");

    tl.to(rowRefs.current, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, "-=0.2");

    PIPELINE_STEPS.forEach((_, i) => {
      const nextProgress = ((i + 1) / PIPELINE_STEPS.length) * 100;
      const tStart = `step-${i}`;

      tl.addLabel(tStart)
        .to(labelRefs.current[i], { color: "#0e1524", duration: 0.2 }, tStart)
        .to(dotRefs.current[i], { opacity: 0, duration: 0.1 }, tStart)
        .to(spinnerRefs.current[i], { opacity: 1, duration: 0.2 }, tStart)
        .to(progressBarRef.current, { width: `${nextProgress}%`, duration: 0.35, ease: "power1.inOut" }, tStart)
        .to({}, { duration: 0.25 })
        .to(spinnerRefs.current[i], { opacity: 0, duration: 0.15 })
        .to([checkRefs.current[i], doneBadgeRefs.current[i]], { opacity: 1, duration: 0.2 }, "<");
    });

    // 3. Transition to Report Phase (Crossfade)
    tl.to({}, { duration: 0.2 })
      .to(agentPhaseRef.current, { opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in" })
      .set(agentPhaseRef.current, { pointerEvents: "none" })
      .set(reportPhaseRef.current, { pointerEvents: "auto" })
      .to(reportPhaseRef.current, { opacity: 1, duration: 0.3 }, "-=0.1")
      .to(bentoGridRef.current, { opacity: 1, duration: 0.4 }, "-=0.1");

    // 4. Detailed Component Slideshow & Camera Pans
    tl.set(companyContentRef.current, { opacity: 1 }, "+=0.2");
    tl.to(companyChildren, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }, "<");
    tl.to({}, { duration: 1.0 });

    tl.addLabel("slide1")
      .to(companyContentRef.current, { opacity: 0, x: -15, duration: 0.4 }, "slide1")
      .to(cameraRef.current, { x: "-20%", y: "20%", duration: 0.8, ease: "power3.inOut" }, "slide1")
      .set(decisionContentRef.current, { opacity: 1 }, "slide1+=0.4")
      .to(decisionChildren, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }, "slide1+=0.4");
    tl.to({}, { duration: 1.0 });

    tl.addLabel("slide2")
      .to(decisionContentRef.current, { opacity: 0, y: -15, duration: 0.4 }, "slide2")
      .to(cameraRef.current, { x: "-20%", y: "-15%", duration: 0.8, ease: "power3.inOut" }, "slide2")
      .set(bullBearContentRef.current, { opacity: 1 }, "slide2+=0.4")
      .to(bullBearChildren, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }, "slide2+=0.4");
    tl.to({}, { duration: 1.0 });

    tl.addLabel("zoomOut")
      .to(cameraRef.current, { scale: 0.92, x: "0%", y: "0%", duration: 1.0, ease: "power3.inOut" }, "zoomOut")
      .to([companyContentRef.current, decisionContentRef.current, bullBearContentRef.current], { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power2.out" }, "zoomOut+=0.2");

    tl.to({}, { duration: 3.5 })
      .to(reportPhaseRef.current, { opacity: 0, duration: 0.4, ease: "power2.inOut" });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface font-sans text-ink ${className}`}>

      {/* ── PHASE 1: Agent Progress ── */}
      <div ref={agentPhaseRef} className="absolute flex w-full max-w-2xl flex-col px-6">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface-subtle px-3 py-1.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
            <span className="text-sm font-medium text-ink-600">Researching AAPL</span>
          </div>
          <div ref={subtitleRef} className="min-h-[1.75rem] text-xl text-ink">
            Synthesizing report &amp; forming thesis...
          </div>
        </div>

        <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-surface-muted">
          <div ref={progressBarRef} className="h-full rounded-full bg-brand-600" style={{ width: "0%" }} />
        </div>

        <div className="flex flex-col space-y-3">
          {PIPELINE_STEPS.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="relative flex items-center gap-3 p-3"
            >
              <div
                ref={(el) => { rowBgRefs.current[i] = el; }}
                className="absolute inset-0 -z-10 rounded-lg border border-transparent"
              />
              <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                <div ref={(el) => { dotRefs.current[i] = el; }} className="absolute h-2 w-2 rounded-full bg-ink-300" />
                <div ref={(el) => { spinnerRefs.current[i] = el; }} className="absolute h-4 w-4 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
                <svg ref={(el) => { checkRefs.current[i] = el; }} className="absolute h-4 w-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <span ref={(el) => { labelRefs.current[i] = el; }} className="flex-1 text-sm text-ink-400">
                {step.label}
              </span>

              {(step.id === "news" || step.id === "financials") && (
                <span className="rounded bg-surface-subtle px-1.5 py-0.5 text-[10px] text-ink-500">
                  parallel
                </span>
              )}
              <span ref={(el) => { doneBadgeRefs.current[i] = el; }} className="text-xs text-ink-400">
                done
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PHASE 2: Final Report (Bento Grid) ── */}
      <div ref={reportPhaseRef} className="absolute flex w-full justify-center">
        <div
          className="flex shrink-0 origin-center items-center justify-center"
          style={{ transform: `scale(${scale})` }}
        >
          <div ref={cameraRef} className="w-[1000px] px-6">

            {/* Top Navbar mockup */}
            <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
              <div className="flex gap-4">
                <div className="h-4 w-20 rounded bg-surface-muted" />
                <div className="h-4 w-24 rounded bg-surface-muted" />
                <div className="h-4 w-16 rounded bg-surface-muted" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-24 rounded-lg border border-line bg-surface-subtle" />
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">★</div>
              </div>
            </div>

            {/* Bento Grid */}
            <div ref={bentoGridRef} className="grid grid-cols-1 gap-3 lg:grid-cols-12">

              {/* Company Snapshot */}
              <div className="col-span-1 flex flex-col rounded-xl border border-line bg-surface p-6 lg:col-span-4">
                <div ref={companyContentRef} className="flex h-full flex-col">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink">
                        <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.99 15h-1.99v-2h-2v2H10v-2H8v-2h2v-2H8V9h2V7h2v2h2V7h2v2h-2v2h2v2h-2v2h2v2z"/>
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-medium text-ink">Apple Inc <span className="align-middle rounded bg-surface-subtle px-1.5 py-0.5 text-xs text-ink-500">AAPL</span></h2>
                        <p className="mt-1 text-xs text-ink-500">Technology · NASDAQ NMS</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-medium text-ink">
                        <span className="text-sm font-normal text-ink-500">USD</span> 315.32
                      </div>
                      <div className="mt-1 inline-flex rounded bg-avoid/10 px-1.5 py-0.5 text-xs text-avoid">
                        ▼ 0.28% (-0.90)
                      </div>
                    </div>
                  </div>

                  <h3 className="mb-3 text-sm uppercase tracking-widest text-ink-400">About Apple Inc</h3>
                  <p className="text-sm leading-relaxed text-ink-600">
                    Apple is best known for creating and selling popular electronics like the iPhone, Mac computers, and the Apple Watch. The company makes money both by selling these high-end gadgets and through digital services like the App Store, music subscriptions, and extra phone storage. People care about Apple because it has a massive, loyal customer base that tends to stick with the brand every time they need a new device.
                  </p>

                  <div className="mt-8 flex gap-8">
                    <div>
                      <p className="mb-1 text-[10px] uppercase tracking-widest text-ink-400">Market Cap</p>
                      <p className="text-sm font-medium text-ink">$4.63M</p>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] uppercase tracking-widest text-ink-400">Website</p>
                      <p className="text-sm font-medium text-brand-600">apple.com ↗</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Thesis */}
              <div className="col-span-1 flex flex-col rounded-xl border border-line bg-surface p-6 lg:col-span-8">

                {/* The Decision Component */}
                <div ref={decisionContentRef}>
                  <div className="mb-8 flex gap-5">
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-line bg-surface-subtle">
                      <div className="mb-1 h-4 w-4 rounded-sm bg-hold" />
                      <span className="text-xs font-semibold text-ink">Hold</span>
                    </div>
                    <div>
                      <h3 className="mb-1 text-xl font-medium text-ink">The Decision</h3>
                      <p className="mb-3 text-sm text-ink-500">Mixed signals — monitor and revisit</p>
                      <p className="text-sm leading-relaxed text-ink-600">
                        Apple is a world-class company with an incredibly loyal customer base, but the stock is currently very expensive while its actual sales growth has started to slow down. While the company&apos;s move into high-profit digital services and its massive stock buybacks are great signs, the high price tag makes it a risky time for new investors to jump in.
                      </p>
                    </div>
                  </div>

                  <h4 className="mb-4 text-xs uppercase tracking-widest text-ink-400">How this call was weighted</h4>
                  <div className="mb-8 space-y-3">
                    <div className="flex justify-between text-xs text-ink-600">
                      <span>Financials</span>
                      <span>35%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-surface-muted">
                      <div className="h-full w-[35%] bg-brand-500" />
                    </div>
                  </div>
                </div>

                {/* Bull Bear Case Component */}
                <div ref={bullBearContentRef} className="mt-auto grid grid-cols-2 gap-8 border-t border-line pt-6">
                  <div>
                    <h4 className="mb-3 text-sm uppercase tracking-widest text-brand-700">The Bull Case</h4>
                    <ul className="space-y-2 text-xs text-ink-600">
                      <li className="flex gap-2">
                        <span className="text-brand-600">+</span> Massive $110 billion share buyback program
                      </li>
                      <li className="flex gap-2">
                        <span className="text-brand-600">+</span> Strong shift toward high-margin digital services
                      </li>
                      <li className="flex gap-2">
                        <span className="text-brand-600">+</span> Positive technical momentum with a &apos;Golden Cross&apos; signal
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm uppercase tracking-widest text-avoid">The Bear Case</h4>
                    <ul className="space-y-2 text-xs text-ink-600">
                      <li className="flex gap-2">
                        <span className="text-avoid">-</span> High stock price relative to actual company earnings
                      </li>
                      <li className="flex gap-2">
                        <span className="text-avoid">-</span> Slowing growth in hardware sales like the iPhone
                      </li>
                      <li className="flex gap-2">
                        <span className="text-avoid">-</span> Loss of market share to local competitors in China
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
