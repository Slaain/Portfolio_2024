import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { Magnetic } from '../components/Magnetic';
import { projects } from '../data/projects';
import { getSkills } from '../data/skills';
import { formatPeriod, pad } from '../lib/format';
import { lockScroll } from '../lib/scroll';
import styles from './ProjectModal.module.css';

const ease = [0.76, 0, 0.24, 1] as const;
const easeOut = [0.22, 1, 0.36, 1] as const;

export function ProjectModal({ slug, onClose, onNavigate }: { slug: string | null; onClose: () => void; onNavigate: (slug: string) => void }) {
	const index = projects.findIndex((p) => p.slug === slug);
	const project = index >= 0 ? projects[index] : null;
	const next = projects[(index + 1) % projects.length];
	const scrollRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		lockScroll(Boolean(project));
		if (!project) return;
		scrollRef.current?.scrollTo({ top: 0 });
		closeRef.current?.focus({ preventScroll: true });
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [project, onClose]);

	return (
		<AnimatePresence>
			{project && (
				<motion.div
					key="modal"
					className={styles.root}
					role="dialog"
					aria-modal="true"
					aria-labelledby="project-title"
					initial={{ clipPath: 'inset(100% 0 0 0 round 32px)' }}
					animate={{ clipPath: 'inset(0% 0 0 0 round 0px)' }}
					exit={{ clipPath: 'inset(0 0 100% 0 round 32px)' }}
					transition={{ duration: 0.9, ease }}
					style={{ '--project-color': project.color } as React.CSSProperties}
				>
					<div ref={scrollRef} className={styles.scroller} data-lenis-prevent>
						<div className={styles.bar}>
							<span className="mono">
								<span className="accent">{pad(index + 1)}</span> / {pad(projects.length)} — Projet
							</span>
							<Magnetic>
								<button ref={closeRef} className={styles.close} onClick={onClose} aria-label="Fermer le projet">
									<span />
									<span />
								</button>
							</Magnetic>
						</div>

						<AnimatePresence mode="wait">
							<motion.article
								key={project.slug}
								className={`container ${styles.article}`}
								initial={{ opacity: 0, y: 40 }}
								animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut, delay: 0.25 } }}
								exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
							>
								<header className={styles.header}>
									<p className={`${styles.type} mono`}>{project.type}</p>
									<h2 id="project-title" className={styles.title}>
										{project.name}
									</h2>
									<div className={styles.facts}>
										<div>
											<span className="mono">Période</span>
											<p>{formatPeriod(project.period)}</p>
										</div>
										<div>
											<span className="mono">Type</span>
											<p>{project.type}</p>
										</div>
										{project.link && (
											<Magnetic>
												<a className={styles.cta} href={project.link.to} target="_blank" rel="noreferrer">
													{project.link.label}
													<span aria-hidden="true">↗</span>
												</a>
											</Magnetic>
										)}
									</div>
								</header>

								<Media media={project.media[0]} name={project.name} hero />

								<div className={styles.body}>
									<div className={styles.stackCol}>
										{project.stack.length > 0 && (
											<>
												<span className="mono">Stack</span>
												<ul className={styles.stack}>
													{getSkills(project.stack).map((s) => (
														<li key={s.slug}>
															<span className="logo-tile">
																<img src={s.logo} alt="" />
															</span>
															{s.name}
														</li>
													))}
												</ul>
											</>
										)}
									</div>
									<div className={styles.text}>
										<p className={styles.short}>{project.shortDescription}</p>
										{project.description.split('\n\n').map((para, i) => (
											<p key={i}>{para}</p>
										))}
									</div>
								</div>

								{project.media.length > 1 && (
									<div className={styles.gallery}>
										{project.media.slice(1).map((m) => (
											<Media key={m.src} media={m} name={project.name} />
										))}
									</div>
								)}

								<button className={styles.next} onClick={() => onNavigate(next.slug)} data-cursor="Suivant">
									<span className="mono">Projet suivant</span>
									<span className={styles.nextName}>
										{next.name} <span aria-hidden="true">→</span>
									</span>
								</button>
							</motion.article>
						</AnimatePresence>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

function Media({ media, name, hero = false }: { media: (typeof projects)[number]['media'][number]; name: string; hero?: boolean }) {
	return (
		<motion.figure
			className={styles.media}
			data-orientation={media.orientation}
			data-kind={media.kind}
			data-hero={hero}
			initial={{ opacity: 0, y: 40, scale: 0.98 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true, margin: '0px 0px -5% 0px' }}
			transition={{ duration: 0.9, ease: easeOut }}
		>
			{media.kind === 'video' ? (
				<video src={media.src} autoPlay muted loop playsInline preload="metadata" aria-label={`${name} — ${media.label}`} />
			) : (
				<img src={media.src} alt={`${name} — ${media.label}`} loading={hero ? 'eager' : 'lazy'} decoding="async" />
			)}
			<figcaption className="mono">{media.label}</figcaption>
		</motion.figure>
	);
}
