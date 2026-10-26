import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';
import { MaskText } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { experiences } from '../data/experience';
import { formatPeriod } from '../lib/format';
import styles from './Experience.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

export function Experience() {
	const listRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] });
	const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

	return (
		<section id="parcours" className="section">
			<div className="container">
				<SectionLabel index="03" label="Parcours professionnel" aside="2017 — 2026" />

				<div className={styles.grid}>
					<div className={styles.intro}>
						<h2 className={styles.heading}>
							<MaskText text="Du terrain" />
							<br />
							<MaskText text="à l’architecture" delay={0.1} className="display accent" />
						</h2>
						<p className={styles.lead}>
							De l’audiovisuel au développement, puis à l’architecture des systèmes d’information : un parcours construit
							projet après projet.
						</p>
					</div>

					<div ref={listRef} className={styles.timeline}>
						<span className={styles.track} aria-hidden="true">
							<motion.span className={styles.fill} style={{ scaleY: progress }} />
						</span>
						<ol className={styles.list}>
						{experiences.map((exp) => (
							<motion.li
								key={exp.slug}
								className={styles.item}
								initial={{ opacity: 0, y: 48 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '0px 0px -15% 0px' }}
								transition={{ duration: 0.9, ease }}
							>
								<span className={styles.node} aria-hidden="true" />
								<div className={styles.head}>
									<span className="logo-tile">
										<img src={exp.logo} alt="" loading="lazy" decoding="async" />
									</span>
									<div>
										<p className={styles.company}>{exp.company}</p>
										<p className={`${styles.period} mono`}>{formatPeriod(exp.period)}</p>
									</div>
									<span className={styles.contract}>{exp.contract}</span>
								</div>
								<h3 className={styles.role}>{exp.role}</h3>
								<p className={styles.location}>{exp.location}</p>
								<p className={styles.desc}>{exp.description}</p>
								<ul className={styles.tags}>
									{exp.tags.map((t) => (
										<li key={t}>{t}</li>
									))}
								</ul>
							</motion.li>
						))}
						</ol>
					</div>
				</div>
			</div>
		</section>
	);
}
