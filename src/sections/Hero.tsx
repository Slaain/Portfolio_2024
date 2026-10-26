import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Magnetic } from '../components/Magnetic';
import { ShaderBackground } from '../components/ShaderBackground';
import { profile } from '../data/profile';
import { useAppState } from '../lib/app-state';
import { useClock } from '../lib/hooks';
import { scrollToTarget } from '../lib/scroll';
import styles from './Hero.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

function Letters({ word, play, delay, className }: { word: string; play: boolean; delay: number; className?: string }) {
	return (
		<span className={`${styles.word} ${className ?? ''}`} aria-hidden="true">
			{word.split('').map((char, i) => (
				<span key={i} className={styles.mask}>
					<motion.span
						className={styles.char}
						initial={{ y: '105%', rotate: 8 }}
						animate={play ? { y: '0%', rotate: 0 } : undefined}
						transition={{ duration: 1.1, ease, delay: delay + i * 0.045 }}
					>
						{char}
					</motion.span>
				</span>
			))}
		</span>
	);
}

export function Hero() {
	const { introDone } = useAppState();
	const time = useClock(profile.timeZone);
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
	const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
	const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
	const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
	const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

	const fadeIn = (delay: number) => ({
		initial: { opacity: 0, y: 16 },
		animate: introDone ? { opacity: 1, y: 0 } : undefined,
		transition: { duration: 0.9, ease, delay }
	});

	return (
		<section id="accueil" ref={ref} className={styles.hero}>
			<motion.div className={styles.bg} style={{ y: bgY }}>
				<ShaderBackground className={styles.canvas} />
			</motion.div>

			<div className={`container ${styles.inner}`}>
				<motion.div className={styles.top} style={{ opacity: fade }}>
					<motion.div className={styles.status} {...fadeIn(0.5)}>
						<span className={styles.pulse} aria-hidden="true" />
						Disponible pour des missions freelance
					</motion.div>
					<motion.p className={`${styles.meta} mono`} {...fadeIn(0.6)}>
						{profile.location} · <span className={styles.time}>{time}</span>
					</motion.p>
				</motion.div>

				<motion.h1 className={styles.title} style={{ y: titleY, scale: titleScale }}>
					<span className="sr-only">
						{profile.firstName} {profile.lastName} — {profile.role}
					</span>
					<Letters word={profile.firstName} play={introDone} delay={0} />
					<Letters word={profile.lastName} play={introDone} delay={0.2} className={`display ${styles.last}`} />
				</motion.h1>

				<motion.div className={styles.bottom} style={{ opacity: fade }}>
					<motion.p className={styles.lead} {...fadeIn(0.7)}>
						<span className={styles.role}>{profile.role}</span> &amp; {profile.roleAlt.toLowerCase()}. Je conçois des
						solutions digitales sur mesure qui allient <em className="display">innovation</em> et{' '}
						<em className="display">performance</em>.
					</motion.p>

					<motion.div className={styles.ctas} {...fadeIn(0.85)}>
						<Magnetic>
							<button className={styles.primary} onClick={() => scrollToTarget('#projets')}>
								<span>Voir mes projets</span>
								<span className={styles.primaryIcon} aria-hidden="true">
									↓
								</span>
							</button>
						</Magnetic>
						<Magnetic>
							<a className={styles.secondary} href={`mailto:${profile.email}`}>
								Me contacter
							</a>
						</Magnetic>
					</motion.div>
				</motion.div>

				<motion.button
					className={`${styles.scroll} mono`}
					onClick={() => scrollToTarget('#apropos')}
					style={{ opacity: fade, visibility: introDone ? 'visible' : 'hidden' }}
					aria-label="Défiler vers la suite"
				>
					<span className={styles.scrollLine} aria-hidden="true" />
					Scroll
				</motion.button>
			</div>
		</section>
	);
}
