import { useEffect, useRef, useState } from "react";

/**
 * Custom animated stethoscope cursor for the public site.
 * - Smooth easing follow
 * - Enlarges on interactive elements
 * - Heartbeat ripple on click
 * - Gracefully falls back on touch devices
 */
export function StethoscopeCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let dx = mx, dy = my, rx = mx, ry = my;
    let hovering = false;
    let raf = 0;
    let angle = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      const t = e.target as HTMLElement | null;
      hovering = !!t?.closest("a,button,[role='button'],input,select,textarea,label,summary,[data-cursor='hover']");
    };
    const onDown = () => {
      const r = ringRef.current;
      if (!r) return;
      r.classList.remove("pulse");
      // force reflow to restart animation
      void r.offsetWidth;
      r.classList.add("pulse");
    };

    const tick = () => {
      dx += (mx - dx) * 0.22;
      dy += (my - dy) * 0.22;
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      const vx = mx - dx, vy = my - dy;
      const target = Math.atan2(vy, vx) * (180 / Math.PI);
      angle += (target - angle) * 0.15;
      const scale = hovering ? 1.35 : 1;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%) rotate(${angle * 0.15}deg) scale(${scale})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${hovering ? 1.6 : 1})`;
        ringRef.current.style.opacity = hovering ? "0.9" : "0.5";
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[999] hidden md:block">
      <div
        ref={ringRef}
        className="stetho-ring absolute left-0 top-0 h-10 w-10 rounded-full border-2 border-[oklch(0.5_0.11_195/0.9)] shadow-[0_0_24px_oklch(0.5_0.11_195/0.55)] transition-[opacity]"
        style={{ willChange: "transform, opacity" }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full bg-white/95 shadow-[0_6px_18px_oklch(0.26_0.06_230/0.35)] backdrop-blur"
        style={{ willChange: "transform" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="oklch(0.42 0.09 200)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3v6a4 4 0 0 0 8 0V3" />
          <path d="M10 15v2a5 5 0 0 0 10 0v-3" />
          <circle cx="20" cy="10" r="2" />
        </svg>
      </div>
    </div>
  );
}
