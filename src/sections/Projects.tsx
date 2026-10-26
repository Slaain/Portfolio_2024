import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from 'motion/react';
import { useEffect, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { projects } from '../data/projects';
import { getSkills } from '../data/skills';
import { pad, yearOf } from '../lib/format';
import { useFinePointer } from '../lib/hooks';
import styles from './Projects.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

/** First landscape visual of a project, used as its cover. */
export const coverOf = (slug: string) => {
	const project = projects.find((p) => p.slug === slug)!;
	return (project.media.find((m) => m.kind === 'image' && m.orientation === 'landscape') ?? project.media[0]).src;
};

export function Projects({ onOpen }: { onOpen: (slug: string) => void }) {
	const fine = useFinePointer();
	const [hovered, setHovered] = useState<string | null>(null);

	// Floating preview that trails the cursor and tilts with its horizontal speed
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
	const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });
	const rotate = useTransform(useVelocity(sx), [-2000, 2000], [-14, 14], { clamp: true });

	// Track the pointer globally so the preview is already in place when a row
	// slides under a still cursor while scrolling.
	useEffect(() => {
		if (!fine) return;
		const onMove = (e: PointerEvent) => {
			x.set(e.clientX);
			y.set(e.clientY);
		};
		window.addEventListener('pointermove', onMove, { passive: true });
		return () => window.removeEventListener('pointermove', onMove);
	}, [fine, x, y]);

	return (
		<section id="projets" className="section">
			<div className="container">
				<SectionLabel index="02" label="Projets sélectionnés" aside={`${pad(projects.length)} projets`} />

				<Reveal>
					<h2 className={styles.heading}>
						Des idées devenues <span className="display accent">produits</span>.
					</h2>
				</Reveal>

				<ul className={styles.list} onPointerLeave={() => setHovered(null)}>
					{projects.map((project, i) => (
						<motion.li
							key={project.slug}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '0px 0px -8% 0px' }}
							transition={{ duration: 0.8, ease, delay: (i % 4) * 0.05 }}
						>
							<button
								className={styles.row}
								data-dim={hovered !== null && hovered !== project.slug}
								style={{ '--project-color': project.color } as React.CSSProperties}
								onPointerEnter={() => setHovered(project.slug)}
								onFocus={() => setHovered(project.slug)}
								onBlur={() => setHovered(null)}
								onClick={() => onOpen(project.slug)}
								data-cursor="Ouvrir"
							>
								<span className={`${styles.index} mono`}>{pad(i + 1)}</span>
								<span className={styles.thumb}>
									<img src={coverOf(project.slug)} alt="" loading="lazy" decoding="async" />
								</span>
								<span className={styles.name}>
									<span className={styles.nameInner}>{project.name}</span>
								</span>
								<span className={styles.type}>{project.type}</span>
								<span className={styles.stack}>
									{getSkills(project.stack)
										.slice(0, 4)
										.map((s) => (
											<span key={s.slug} className="logo-tile" title={s.name}>
												<img src={s.logo} alt={s.name} loading="lazy" decoding="async" />
											</span>
										))}
								</span>
								<span className={`${styles.year} mono`}>{yearOf(project.period.from)}</span>
								<span className={styles.arrow} aria-hidden="true">
									↗
								</span>
							</button>
						</motion.li>
					))}
				</ul>
			</div>

			{fine && (
				<motion.div className={styles.preview} style={{ x: sx, y: sy, rotate }} aria-hidden="true">
					<AnimatePresence>
						{hovered && (
							<motion.div
								key="frame"
								className={styles.previewFrame}
								initial={{ scale: 0.4, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.4, opacity: 0 }}
								transition={{ type: 'spring', stiffness: 300, damping: 26 }}
							>
								<AnimatePresence initial={false}>
									<motion.img
										key={hovered}
										src={coverOf(hovered)}
										alt=""
										initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.15 }}
										animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.6, ease }}
									/>
								</AnimatePresence>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			)}
		</section>
	);
}
