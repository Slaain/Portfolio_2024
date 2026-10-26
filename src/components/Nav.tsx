import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { navSections, sectionIds, sections } from '../data/navigation';
import { profile } from '../data/profile';
import { useAppState } from '../lib/app-state';
import { useActiveSection } from '../lib/hooks';
import { lockScroll, scrollToTarget } from '../lib/scroll';
import { Magnetic } from './Magnetic';
import styles from './Nav.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

export function Nav() {
	const { introDone, toggleTheme, theme, setPaletteOpen } = useAppState();
	const active = useActiveSection(sectionIds);
	const [hidden, setHidden] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [hovered, setHovered] = useState<string | null>(null);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, 'change', (y) => {
		const prev = scrollY.getPrevious() ?? 0;
		setScrolled(y > 40);
		setHidden(y > prev && y > 400 && !menuOpen);
	});

	useEffect(() => {
		lockScroll(menuOpen);
	}, [menuOpen]);

	const go = (id: string) => {
		setMenuOpen(false);
		scrollToTarget(`#${id}`);
	};

	const onThemeClick = (e: React.MouseEvent) => {
		const root = document.documentElement;
		root.style.setProperty('--vt-x', `${e.clientX}px`);
		root.style.setProperty('--vt-y', `${e.clientY}px`);
		toggleTheme();
	};

	const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

	return (
		<>
			<motion.header
				className={styles.header}
				data-scrolled={scrolled}
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: introDone && !hidden ? 0 : -100, opacity: introDone ? 1 : 0 }}
				transition={{ duration: 0.7, ease }}
			>
				<a
					href="#accueil"
					className={styles.brand}
					onClick={(e) => {
						e.preventDefault();
						go('accueil');
					}}
				>
					<span className={styles.mark} aria-hidden="true">
						<span className="display">ia</span>
					</span>
					<span className={styles.brandText}>
						{profile.firstName} {profile.lastName}
					</span>
				</a>

				<nav className={styles.pill} aria-label="Navigation principale" onPointerLeave={() => setHovered(null)}>
					{navSections.map((s) => {
						const highlighted = hovered ? hovered === s.id : active === s.id;
						return (
							<a
								key={s.id}
								href={`#${s.id}`}
								className={styles.link}
								data-active={active === s.id}
								onPointerEnter={() => setHovered(s.id)}
								onClick={(e) => {
									e.preventDefault();
									go(s.id);
								}}
							>
								{highlighted && (
									<motion.span
										layoutId="nav-highlight"
										className={styles.highlight}
										transition={{ type: 'spring', stiffness: 380, damping: 32 }}
									/>
								)}
								<span className={styles.linkText}>{s.label}</span>
							</a>
						);
					})}
				</nav>

				<div className={styles.actions}>
					<button className={styles.kbd} onClick={() => setPaletteOpen(true)} aria-label="Ouvrir la palette de commandes">
						<span>{isMac ? '⌘' : 'Ctrl'}</span>
						<span>K</span>
					</button>
					<Magnetic strength={0.4}>
						<button
							className={styles.iconBtn}
							onClick={onThemeClick}
							aria-label={theme === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre'}
						>
							<ThemeIcon dark={theme === 'dark'} />
						</button>
					</Magnetic>
					<button
						className={styles.menuBtn}
						onClick={() => setMenuOpen((o) => !o)}
						aria-expanded={menuOpen}
						aria-label="Menu"
					>
						<span data-open={menuOpen} />
						<span data-open={menuOpen} />
					</button>
				</div>
			</motion.header>

			<AnimatePresence>
				{menuOpen && (
					<motion.div
						className={styles.overlay}
						initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
						animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
						exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
						transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
					>
						<ul className={styles.overlayList}>
							{sections.map((s, i) => (
								<li key={s.id} style={{ overflow: 'hidden' }}>
									<motion.a
										href={`#${s.id}`}
										className={styles.overlayLink}
										initial={{ y: '110%' }}
										animate={{ y: 0 }}
										exit={{ y: '110%' }}
										transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.05 }}
										onClick={(e) => {
											e.preventDefault();
											go(s.id);
										}}
									>
										<span className="mono">{String(i + 1).padStart(2, '0')}</span>
										{s.label}
									</motion.a>
								</li>
							))}
						</ul>
						<motion.div
							className={styles.overlayFoot}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { delay: 0.5 } }}
							exit={{ opacity: 0 }}
						>
							<a href={`mailto:${profile.email}`}>{profile.email}</a>
							{profile.links.map((l) => (
								<a key={l.href} href={l.href} target="_blank" rel="noreferrer">
									{l.label} ↗
								</a>
							))}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

function ThemeIcon({ dark }: { dark: boolean }) {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<mask id="moon-mask">
				<rect width="24" height="24" fill="white" />
				<motion.circle
					r="6"
					fill="black"
					initial={false}
					animate={{ cx: dark ? 16 : 30, cy: dark ? 8 : 0 }}
					transition={{ type: 'spring', stiffness: 300, damping: 24 }}
				/>
			</mask>
			<motion.circle
				cx="12"
				cy="12"
				fill="currentColor"
				mask="url(#moon-mask)"
				initial={false}
				animate={{ r: dark ? 7 : 4.5 }}
				transition={{ type: 'spring', stiffness: 300, damping: 20 }}
			/>
			<motion.g
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				animate={{ opacity: dark ? 0 : 1, rotate: dark ? -45 : 0, scale: dark ? 0.6 : 1 }}
				style={{ originX: '12px', originY: '12px' }}
			>
				<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
			</motion.g>
		</svg>
	);
}
