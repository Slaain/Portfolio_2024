import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useRef, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { categories, skills } from '../data/skills';
import type { SkillCategory } from '../data/types';
import styles from './Skills.module.css';

type Filter = 'featured' | 'all' | SkillCategory;

const filters: Array<{ id: Filter; label: string }> = [
	{ id: 'featured', label: 'Les plus utilisés' },
	{ id: 'all', label: 'Tout' },
	...categories.map((c) => ({ id: c.slug as Filter, label: c.name }))
];

const categoryName = new Map(categories.map((c) => [c.slug, c.name]));

export function Skills() {
	const [filter, setFilter] = useState<Filter>('featured');
	const gridRef = useRef<HTMLUListElement>(null);

	const visible = skills.filter((s) =>
		filter === 'all' ? true : filter === 'featured' ? s.featured : s.category === filter
	);

	// One listener drives the spotlight on every card: each card gets the cursor
	// position relative to itself, so borders light up even on neighbours.
	const onPointerMove = (e: React.PointerEvent) => {
		gridRef.current?.querySelectorAll<HTMLElement>('[data-card]').forEach((card) => {
			const rect = card.getBoundingClientRect();
			card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
			card.style.setProperty('--my', `${e.clientY - rect.top}px`);
		});
	};

	return (
		<section id="competences" className="section">
			<div className="container">
				<SectionLabel index="04" label="Compétences" aside={`${skills.length} technologies`} />

				<div className={styles.top}>
					<Reveal>
						<h2 className={styles.heading}>
							Une boîte à outils <span className="display accent">full‑stack</span>, du pixel au serveur.
						</h2>
					</Reveal>
				</div>

				<LayoutGroup>
					<div className={styles.filters} role="tablist" aria-label="Filtrer les compétences">
						{filters.map((f) => (
							<button
								key={f.id}
								role="tab"
								aria-selected={filter === f.id}
								className={styles.filter}
								onClick={() => setFilter(f.id)}
							>
								{filter === f.id && (
									<motion.span
										layoutId="skill-filter"
										className={styles.filterBg}
										transition={{ type: 'spring', stiffness: 400, damping: 34 }}
									/>
								)}
								<span className={styles.filterText}>{f.label}</span>
							</button>
						))}
					</div>

					<motion.ul ref={gridRef} layout className={styles.grid} onPointerMove={onPointerMove}>
						<AnimatePresence mode="popLayout" initial={false}>
							{visible.map((skill, i) => (
								<motion.li
									key={skill.slug}
									layout
									data-card
									className={styles.card}
									initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
									animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
									exit={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
									transition={{ type: 'spring', stiffness: 300, damping: 28, delay: Math.min(i, 12) * 0.02 }}
								>
									<div className={styles.cardInner}>
										<div className={styles.cardTop}>
											<span className="logo-tile">
												<img src={skill.logo} alt="" loading="lazy" decoding="async" />
											</span>
											<span className={`${styles.cat} mono`}>{categoryName.get(skill.category)}</span>
										</div>
										<h3 className={styles.name}>{skill.name}</h3>
										<p className={styles.desc}>{skill.description}</p>
									</div>
								</motion.li>
							))}
						</AnimatePresence>
					</motion.ul>
				</LayoutGroup>
			</div>
		</section>
	);
}
