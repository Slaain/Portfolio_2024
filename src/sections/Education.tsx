import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Reveal } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { education } from '../data/education';
import type { Education as EducationItem } from '../data/types';
import { formatPeriod, pad } from '../lib/format';
import { useFinePointer } from '../lib/hooks';
import styles from './Education.module.css';

function Card({ item, index }: { item: EducationItem; index: number }) {
	const fine = useFinePointer();
	const px = useMotionValue(0.5);
	const py = useMotionValue(0.5);
	const spring = { stiffness: 200, damping: 20 };
	const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), spring);
	const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), spring);

	return (
		<motion.article
			className={styles.card}
			style={fine ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
			initial={{ opacity: 0, y: 60 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '0px 0px -10% 0px' }}
			transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
			onPointerMove={(e) => {
				const rect = e.currentTarget.getBoundingClientRect();
				px.set((e.clientX - rect.left) / rect.width);
				py.set((e.clientY - rect.top) / rect.height);
			}}
			onPointerLeave={() => {
				px.set(0.5);
				py.set(0.5);
			}}
		>
			<div className={styles.cardHead}>
				<span className="logo-tile">
					<img src={item.logo} alt="" loading="lazy" decoding="async" />
				</span>
				<span className={`${styles.num} mono`}>{pad(index + 1)}</span>
			</div>
			<p className={`${styles.period} mono`}>{formatPeriod(item.period)}</p>
			<h3 className={styles.degree}>{item.degree}</h3>
			<p className={styles.school}>
				{item.school} · {item.location}
			</p>
			<p className={styles.desc}>{item.description}</p>
			<ul className={styles.subjects}>
				{item.subjects.map((s) => (
					<li key={s}>{s}</li>
				))}
			</ul>
		</motion.article>
	);
}

export function Education() {
	return (
		<section id="formation" className="section">
			<div className="container">
				<SectionLabel index="05" label="Formation" aside={`${pad(education.length)} diplômes`} />
				<Reveal>
					<h2 className={styles.heading}>
						Apprendre, <span className="display accent">toujours</span>.
					</h2>
				</Reveal>
				<div className={styles.grid}>
					{education.map((item, i) => (
						<Card key={item.slug} item={item} index={i} />
					))}
				</div>
			</div>
		</section>
	);
}
