import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { useAppState } from '../lib/app-state';
import styles from './Chrome.module.css';

/** Thin reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
	return <motion.div className={styles.progress} style={{ scaleX }} aria-hidden="true" />;
}

export function Toast() {
	const { toast } = useAppState();
	return (
		<div className={styles.toastWrap} aria-live="polite">
			<AnimatePresence>
				{toast && (
					<motion.div
						key={toast}
						className={styles.toast}
						initial={{ opacity: 0, y: 24, scale: 0.9 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 12, scale: 0.95 }}
						transition={{ type: 'spring', stiffness: 400, damping: 28 }}
					>
						{toast}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
