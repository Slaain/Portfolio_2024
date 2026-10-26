import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { useReducedMotion } from '../lib/hooks';
import styles from './Marquee.module.css';

const wrap = (min: number, max: number, v: number) => {
	const range = max - min;
	return ((((v - min) % range) + range) % range) + min;
};

/**
 * Infinite marquee whose speed and direction react to scroll velocity.
 * Content is rendered twice so the loop is seamless.
 */
export function Marquee({ children, speed = 3, reverse = false }: { children: ReactNode; speed?: number; reverse?: boolean }) {
	const reduced = useReducedMotion();
	const base = useMotionValue(0);
	const { scrollY } = useScroll();
	const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
	const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
	const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
	const direction = useRef(reverse ? 1 : -1);
	const hovered = useRef(false);

	useAnimationFrame((_, delta) => {
		if (reduced) return;
		let move = direction.current * (speed / 100) * (delta / 16);
		const b = boost.get();
		if (b < 0) direction.current = reverse ? -1 : 1;
		else if (b > 0) direction.current = reverse ? 1 : -1;
		move += direction.current * Math.abs(b) * (speed / 100) * (delta / 16);
		base.set(base.get() + (hovered.current ? move * 0.2 : move));
	});

	return (
		<div
			className={styles.root}
			onPointerEnter={() => (hovered.current = true)}
			onPointerLeave={() => (hovered.current = false)}
		>
			<motion.div className={styles.track} style={{ x }}>
				<div className={styles.group}>{children}</div>
				<div className={styles.group} aria-hidden="true">
					{children}
				</div>
			</motion.div>
		</div>
	);
}
