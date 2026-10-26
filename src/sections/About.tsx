import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { Reveal } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { education } from '../data/education';
import { experiences } from '../data/experience';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import { Counter } from '../components/Counter';
import styles from './About.module.css';

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
	const opacity = useTransform(progress, range, [0.14, 1]);
	const blur = useTransform(progress, range, ['blur(3px)', 'blur(0px)']);
	return (
		<motion.span style={{ opacity, filter: blur }} className={styles.word}>
			{children}
		</motion.span>
	);
}

// Development experience starts with the first tech role (the audiovisual job is excluded)
const firstDevYear = Math.min(
	...experiences.filter((e) => e.slug !== 'vatos-locos').map((e) => Number(e.period.from.slice(0, 4)))
);

const stats = [
	{ value: projects.length, suffix: '', label: 'Projets livrés' },
	{ value: new Date().getFullYear() - firstDevYear, suffix: '+', label: "Années d'expérience en développement" },
	{ value: skills.length, suffix: '', label: 'Technologies maîtrisées' },
	{ value: education.length, suffix: '', label: 'Diplômes, dont un Master Cloud' }
];

export function About() {
	const ref = useRef<HTMLParagraphElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
	const words = profile.description.split(' ');

	return (
		<section id="apropos" className="section">
			<div className="container">
				<SectionLabel index="01" label="À propos" />
				<p ref={ref} className={styles.text} aria-label={profile.description}>
					{words.map((word, i) => (
						<Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
							{word}
						</Word>
					))}
				</p>

				<div className={styles.stats}>
					{stats.map((s, i) => (
						<Reveal key={s.label} delay={i * 0.08} className={styles.stat}>
							<span className={styles.statValue}>
								<Counter to={s.value} />
								<span className="accent">{s.suffix}</span>
							</span>
							<span className={styles.statLabel}>{s.label}</span>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
