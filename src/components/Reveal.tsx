import { motion, type HTMLMotionProps } from 'motion/react';
import type { ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its content the first time it enters the viewport. */
export function Reveal({
	children,
	delay = 0,
	y = 32,
	...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<'div'>) {
	return (
		<motion.div
			initial={{ opacity: 0, y, filter: 'blur(6px)' }}
			whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
			viewport={{ once: true, margin: '0px 0px -12% 0px' }}
			transition={{ duration: 0.9, delay, ease }}
			{...rest}
		>
			{children}
		</motion.div>
	);
}

/** Splits text into words that slide up from a mask, one after the other. */
export function MaskText({
	text,
	className,
	delay = 0,
	stagger = 0.04,
	play
}: {
	text: string;
	className?: string;
	delay?: number;
	stagger?: number;
	/** When provided, animates on this flag instead of on viewport entry. */
	play?: boolean;
}) {
	const words = text.split(' ');
	const trigger =
		play === undefined
			? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
			: { initial: 'hidden', animate: play ? 'show' : 'hidden' };

	return (
		<motion.span className={className} aria-label={text} {...trigger} style={{ display: 'inline' }}>
			{words.map((word, i) => (
				<span
					key={i}
					aria-hidden="true"
					style={{ display: 'inline-block', overflowX: 'visible', overflowY: 'clip', verticalAlign: 'top', paddingBottom: '0.08em' }}
				>
					<motion.span
						style={{ display: 'inline-block' }}
						variants={{
							hidden: { y: '110%' },
							show: { y: '0%', transition: { duration: 0.9, ease, delay: delay + i * stagger } }
						}}
					>
						{word}
						{i < words.length - 1 ? ' ' : ''}
					</motion.span>
				</span>
			))}
		</motion.span>
	);
}
