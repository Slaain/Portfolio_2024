import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { useFinePointer, useReducedMotion } from '../lib/hooks';
import styles from './Cursor.module.css';

type Mode = 'default' | 'link' | 'view' | 'text';

/**
 * Dot + trailing ring. Elements can set `data-cursor="view"` (or any label)
 * to morph the ring into a labelled bubble.
 */
export function Cursor() {
	const fine = useFinePointer();
	const reduced = useReducedMotion();
	const enabled = fine && !reduced;

	const x = useMotionValue(-100);
	const y = useMotionValue(-100);
	const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
	const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

	const [mode, setMode] = useState<Mode>('default');
	const [label, setLabel] = useState('');
	const [pressed, setPressed] = useState(false);
	const [hidden, setHidden] = useState(true);

	useEffect(() => {
		if (!enabled) return;
		document.documentElement.classList.add('has-cursor');

		const last = { x: -100, y: -100 };

		const detect = (target: HTMLElement | null) => {
			const labelled = target?.closest<HTMLElement>('[data-cursor]');
			if (labelled) {
				setMode('view');
				setLabel(labelled.dataset.cursor ?? '');
			} else if (target?.closest('a, button, [role="button"], input, label')) {
				setMode(target.closest('input') ? 'text' : 'link');
			} else {
				setMode('default');
			}
		};

		const onMove = (e: PointerEvent) => {
			last.x = e.clientX;
			last.y = e.clientY;
			x.set(e.clientX);
			y.set(e.clientY);
			setHidden(false);
			detect(e.target as HTMLElement | null);
		};
		// Content moves under a still cursor while scrolling: re-check what is below it
		const onScroll = () => detect(document.elementFromPoint(last.x, last.y) as HTMLElement | null);
		const onDown = () => setPressed(true);
		const onUp = () => {
			setPressed(false);
			// A click may open an overlay (project, menu) under a still cursor
			setTimeout(onScroll, 60);
		};
		const onLeave = () => setHidden(true);

		window.addEventListener('pointermove', onMove, { passive: true });
		window.addEventListener('scroll', onScroll, { passive: true, capture: true });
		window.addEventListener('pointerdown', onDown);
		window.addEventListener('pointerup', onUp);
		document.addEventListener('pointerleave', onLeave);
		return () => {
			document.documentElement.classList.remove('has-cursor');
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('scroll', onScroll, { capture: true });
			window.removeEventListener('pointerdown', onDown);
			window.removeEventListener('pointerup', onUp);
			document.removeEventListener('pointerleave', onLeave);
		};
	}, [enabled, x, y]);

	if (!enabled) return null;

	const ringSize = mode === 'view' ? 96 : mode === 'link' ? 56 : mode === 'text' ? 4 : 34;

	return (
		<>
			<motion.div
				className={styles.dot}
				style={{ x, y }}
				animate={{ scale: hidden || mode === 'view' ? 0 : pressed ? 0.6 : 1 }}
				transition={{ duration: 0.2 }}
			/>
			<motion.div
				className={styles.ring}
				data-mode={mode}
				style={{ x: ringX, y: ringY }}
				animate={{
					width: ringSize,
					height: mode === 'text' ? 28 : ringSize,
					opacity: hidden ? 0 : 1,
					scale: pressed ? 0.85 : 1
				}}
				transition={{ type: 'spring', stiffness: 400, damping: 30 }}
			>
				{mode === 'view' && (
					<motion.span
						className={styles.label}
						initial={{ opacity: 0, scale: 0.6 }}
						animate={{ opacity: 1, scale: 1 }}
					>
						{label}
					</motion.span>
				)}
			</motion.div>
		</>
	);
}
