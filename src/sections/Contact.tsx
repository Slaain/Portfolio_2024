import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Magnetic } from '../components/Magnetic';
import { MaskText } from '../components/Reveal';
import { profile } from '../data/profile';
import { copyToClipboard, useAppState } from '../lib/app-state';
import { useClock } from '../lib/hooks';
import { scrollToTarget } from '../lib/scroll';
import styles from './Contact.module.css';

const year = new Date().getFullYear();

export function Contact() {
	const { notify } = useAppState();
	const time = useClock(profile.timeZone);
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
	const giantX = useTransform(scrollYProgress, [0, 1], ['12%', '0%']);

	const copyEmail = async () => {
		notify((await copyToClipboard(profile.email)) ? 'Email copié dans le presse-papier ✓' : profile.email);
	};

	return (
		<footer id="contact" ref={ref} className={styles.root}>
			<div className={`container ${styles.inner}`}>
				<p className={`${styles.kicker} mono`}>
					<span className="accent">06</span> — Contact
				</p>

				<h2 className={styles.heading}>
					<MaskText text="Construisons ensemble" />
					<br />
					<MaskText text="l’avenir de votre entreprise." delay={0.15} className="display accent" />
				</h2>

				<p className={styles.sub}>{profile.subDescription}</p>

				<div className={styles.actions}>
					<Magnetic strength={0.25}>
						<a className={styles.mail} href={`mailto:${profile.email}`} data-cursor="Écrire">
							<span className={styles.mailText}>{profile.email}</span>
							<span className={styles.mailIcon} aria-hidden="true">
								↗
							</span>
						</a>
					</Magnetic>
					<button className={styles.copy} onClick={copyEmail}>
						Copier l’email
					</button>
				</div>

				<div className={styles.links}>
					<a href={profile.phoneHref} className={styles.link}>
						<span className="mono">Téléphone</span>
						{profile.phone}
					</a>
					{profile.links.map((l) => (
						<a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={styles.link}>
							<span className="mono">{l.label}</span>
							{l.handle} ↗
						</a>
					))}
					<a href={profile.cv} target="_blank" rel="noreferrer" className={styles.link}>
						<span className="mono">Curriculum vitae</span>
						Télécharger le PDF ↓
					</a>
				</div>
			</div>

			<motion.div className={styles.giant} style={{ x: giantX }} aria-hidden="true">
				Idris <span className="display">Ali</span>
			</motion.div>

			<div className={`container ${styles.bottom}`}>
				<span>© {year} Idris Ali</span>
				<span className="mono">
					{profile.location} · {time}
				</span>
				<button onClick={() => scrollToTarget(0)} className={styles.top}>
					Retour en haut ↑
				</button>
			</div>
		</footer>
	);
}
