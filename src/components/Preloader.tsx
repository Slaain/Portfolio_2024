import { animate, AnimatePresence, motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { useAppState } from '../lib/app-state';
import styles from './Preloader.module.css';

const ease = [0.76, 0, 0.24, 1] as const;

/** Short counter intro, shown once per browser session. */
export function Preloader() {
	const { finishIntro } = useAppState();
	const [visible, setVisible] = useState(() => {
		try {
			return !sessionStorage.getItem('intro-seen') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		} catch {
			return true;
		}
	});
	const count = useMotionValue(0);
	const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'));

	useEffect(() => {
		if (!visible) {
			finishIntro();
			return;
		}
		const controls = animate(count, 100, {
			duration: 1.3,
			ease: [0.65, 0, 0.35, 1],
			onComplete: () => {
				try {
					sessionStorage.setItem('intro-seen', '1');
				} catch {
					// ignore
				}
				setVisible(false);
				// Let the curtain start lifting before the hero animates in
				setTimeout(finishIntro, 250);
			}
		});
		return () => controls.stop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					className={styles.root}
					exit={{ clipPath: 'inset(0 0 100% 0)' }}
					transition={{ duration: 0.9, ease }}
				>
					<div className={styles.inner}>
						<motion.span
							className={styles.name}
							initial={{ y: '100%' }}
							animate={{ y: 0 }}
							transition={{ duration: 0.8, ease }}
						>
							Idris <span className="display">Ali</span>
						</motion.span>
						<span className={`${styles.tag} mono`}>Portfolio — 2026</span>
					</div>
					<motion.span className={styles.count}>{rounded}</motion.span>
					<motion.span
						className={styles.bar}
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
