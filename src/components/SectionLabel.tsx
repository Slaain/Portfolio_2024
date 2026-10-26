import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import styles from './SectionLabel.module.css';

export function SectionLabel({ index, label, aside }: { index: string; label: string; aside?: ReactNode }) {
	return (
		<div className={styles.root}>
			<motion.span
				className={styles.line}
				initial={{ scaleX: 0 }}
				whileInView={{ scaleX: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
			/>
			<span className="mono">
				<span className="accent">{index}</span> — {label}
			</span>
			{aside && <span className={`${styles.aside} mono`}>{aside}</span>}
		</div>
	);
}
