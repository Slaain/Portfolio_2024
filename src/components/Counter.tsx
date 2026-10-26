import { animate, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

/** Counts up from 0 the first time it scrolls into view. */
export function Counter({ to, duration = 1.6 }: { to: number; duration?: number }) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

	useEffect(() => {
		if (!inView || !ref.current) return;
		const node = ref.current;
		const controls = animate(0, to, {
			duration,
			ease: [0.22, 1, 0.36, 1],
			onUpdate: (v) => (node.textContent = String(Math.round(v)).padStart(2, '0'))
		});
		return () => controls.stop();
	}, [inView, to, duration]);

	return <span ref={ref}>00</span>;
}
