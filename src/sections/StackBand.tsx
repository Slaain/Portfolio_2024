import { Marquee } from '../components/Marquee';
import { skills } from '../data/skills';
import styles from './StackBand.module.css';

const half = Math.ceil(skills.length / 2);
const rows = [skills.slice(0, half), skills.slice(half)];

/** Two counter-scrolling rows of technologies between "About" and "Projects". */
export function StackBand() {
	return (
		<section className={styles.band} aria-label="Technologies">
			{rows.map((row, i) => (
				<Marquee key={i} reverse={i === 1} speed={2.4}>
					{row.map((skill) => (
						<span key={skill.slug} className={styles.chip}>
							<span className="logo-tile">
								<img src={skill.logo} alt="" loading="lazy" decoding="async" />
							</span>
							{skill.name}
						</span>
					))}
				</Marquee>
			))}
		</section>
	);
}
