import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { sections } from '../data/navigation';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { copyToClipboard, useAppState } from '../lib/app-state';
import { lockScroll, scrollToTarget } from '../lib/scroll';
import styles from './CommandPalette.module.css';

interface Command {
	id: string;
	group: string;
	label: string;
	hint?: string;
	icon: ReactNode;
	run: () => void;
}

const Arrow = () => <span aria-hidden="true">→</span>;
const External = () => <span aria-hidden="true">↗</span>;

export function CommandPalette({ onOpenProject }: { onOpenProject: (slug: string) => void }) {
	const { paletteOpen, setPaletteOpen, toggleTheme, theme, notify } = useAppState();
	const [query, setQuery] = useState('');
	const [index, setIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				setPaletteOpen(!paletteOpen);
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [paletteOpen, setPaletteOpen]);

	useEffect(() => {
		lockScroll(paletteOpen);
		if (paletteOpen) {
			setQuery('');
			setIndex(0);
			requestAnimationFrame(() => inputRef.current?.focus());
		}
	}, [paletteOpen]);

	const commands = useMemo<Array<Command>>(() => {
		const close = (fn: () => void) => () => {
			setPaletteOpen(false);
			fn();
		};
		return [
			...sections.map((s) => ({
				id: `go-${s.id}`,
				group: 'Navigation',
				label: s.label,
				icon: <Arrow />,
				run: close(() => scrollToTarget(`#${s.id}`))
			})),
			...projects.map((p) => ({
				id: `project-${p.slug}`,
				group: 'Projets',
				label: p.name,
				hint: p.type,
				icon: <span className={styles.swatch} style={{ background: p.color }} />,
				run: close(() => onOpenProject(p.slug))
			})),
			{
				id: 'copy-email',
				group: 'Actions',
				label: 'Copier mon email',
				hint: profile.email,
				icon: <span aria-hidden="true">@</span>,
				run: close(async () => notify((await copyToClipboard(profile.email)) ? 'Email copié ✓' : profile.email))
			},
			{
				id: 'cv',
				group: 'Actions',
				label: 'Télécharger mon CV',
				hint: 'PDF',
				icon: <span aria-hidden="true">↓</span>,
				run: close(() => window.open(profile.cv, '_blank'))
			},
			{
				id: 'theme',
				group: 'Actions',
				label: theme === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre',
				icon: <span aria-hidden="true">◐</span>,
				run: close(toggleTheme)
			},
			...profile.links.map((l) => ({
				id: `link-${l.label}`,
				group: 'Liens',
				label: l.label,
				hint: l.handle,
				icon: <External />,
				run: close(() => window.open(l.href, '_blank', 'noopener'))
			}))
		];
	}, [setPaletteOpen, onOpenProject, notify, theme, toggleTheme]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return commands;
		return commands.filter((c) => `${c.label} ${c.hint ?? ''} ${c.group}`.toLowerCase().includes(q));
	}, [commands, query]);

	useEffect(() => {
		listRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`)?.scrollIntoView({ block: 'nearest' });
	}, [index]);

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setIndex((i) => (i + 1) % Math.max(filtered.length, 1));
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
		} else if (e.key === 'Enter') {
			e.preventDefault();
			filtered[index]?.run();
		} else if (e.key === 'Escape') {
			setPaletteOpen(false);
		}
	};

	let lastGroup = '';

	return (
		<AnimatePresence>
			{paletteOpen && (
				<motion.div
					className={styles.backdrop}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={() => setPaletteOpen(false)}
				>
					<motion.div
						className={styles.panel}
						role="dialog"
						aria-modal="true"
						aria-label="Palette de commandes"
						initial={{ opacity: 0, y: -16, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -8, scale: 0.98 }}
						transition={{ type: 'spring', stiffness: 420, damping: 32 }}
						onClick={(e) => e.stopPropagation()}
						onKeyDown={onKeyDown}
						data-lenis-prevent
					>
						<div className={styles.search}>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
								<circle cx="11" cy="11" r="7" />
								<path d="m20 20-3.5-3.5" />
							</svg>
							<input
								ref={inputRef}
								value={query}
								onChange={(e) => {
									setQuery(e.target.value);
									setIndex(0);
								}}
								placeholder="Rechercher une section, un projet, une action…"
								aria-label="Rechercher"
								role="combobox"
								aria-expanded="true"
								aria-controls="palette-list"
								aria-activedescendant={filtered[index] ? `cmd-${filtered[index].id}` : undefined}
							/>
							<kbd className={styles.esc}>esc</kbd>
						</div>
						<ul id="palette-list" ref={listRef} className={styles.list} role="listbox">
							{filtered.length === 0 && <li className={styles.empty}>Aucun résultat pour « {query} »</li>}
							{filtered.map((c, i) => {
								const header = c.group !== lastGroup ? c.group : null;
								lastGroup = c.group;
								return (
									<li key={c.id} role="presentation">
										{header && <div className={`${styles.group} mono`}>{header}</div>}
										<button
											id={`cmd-${c.id}`}
											role="option"
											aria-selected={i === index}
											data-index={i}
											className={styles.item}
											onPointerMove={() => setIndex(i)}
											onClick={c.run}
										>
											{i === index && (
												<motion.span
													layoutId="palette-active"
													className={styles.active}
													transition={{ type: 'spring', stiffness: 500, damping: 38 }}
												/>
											)}
											<span className={styles.icon}>{c.icon}</span>
											<span className={styles.label}>{c.label}</span>
											{c.hint && <span className={styles.hint}>{c.hint}</span>}
										</button>
									</li>
								);
							})}
						</ul>
						<div className={`${styles.foot} mono`}>
							<span>
								<kbd>↑</kbd>
								<kbd>↓</kbd> naviguer
							</span>
							<span>
								<kbd>↵</kbd> ouvrir
							</span>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
