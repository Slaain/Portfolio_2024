import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { useFinePointer } from '../lib/hooks';

/** Pulls its child toward the cursor while hovered. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
	const ref = useRef<HTMLSpanElement>(null);
	const fine = useFinePointer();
	const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.6 });
	const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.6 });

	if (!fine) return <>{children}</>;

	return (
		<motion.span
			ref={ref}
			style={{ x, y, display: 'inline-flex' }}
			onPointerMove={(e) => {
				const rect = ref.current!.getBoundingClientRect();
				x.set((e.clientX - rect.left - rect.width / 2) * strength);
				y.set((e.clientY - rect.top - rect.height / 2) * strength);
			}}
			onPointerLeave={() => {
				x.set(0);
				y.set(0);
			}}
		>
			{children}
		</motion.span>
	);
}
