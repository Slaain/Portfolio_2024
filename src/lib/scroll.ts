import Lenis from 'lenis';

let lenis: Lenis | null = null;

export const prefersReducedMotion = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function startSmoothScroll() {
	if (lenis || prefersReducedMotion()) return () => {};

	lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });

	let frame = requestAnimationFrame(function raf(time) {
		lenis?.raf(time);
		frame = requestAnimationFrame(raf);
	});

	return () => {
		cancelAnimationFrame(frame);
		lenis?.destroy();
		lenis = null;
	};
}

export function scrollToTarget(target: string | number) {
	if (lenis) {
		lenis.scrollTo(target, { offset: 0, duration: 1.4 });
		return;
	}
	if (typeof target === 'number') {
		window.scrollTo({ top: target, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
	} else {
		document.querySelector(target)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
	}
}

export function lockScroll(locked: boolean) {
	if (locked) lenis?.stop();
	else lenis?.start();
	document.documentElement.style.overflow = locked ? 'hidden' : '';
}
