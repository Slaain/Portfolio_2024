import { MotionConfig } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollProgress, Toast } from './components/Chrome';
import { CommandPalette } from './components/CommandPalette';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { Preloader } from './components/Preloader';
import { projects } from './data/projects';
import { startSmoothScroll } from './lib/scroll';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Education } from './sections/Education';
import { Experience } from './sections/Experience';
import { Hero } from './sections/Hero';
import { ProjectModal } from './sections/ProjectModal';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { StackBand } from './sections/StackBand';

const projectFromHash = () => {
	const match = window.location.hash.match(/^#projet\/(.+)$/);
	return match && projects.some((p) => p.slug === match[1]) ? match[1] : null;
};

export default function App() {
	const [openProject, setOpenProject] = useState<string | null>(projectFromHash);
	// Whether we added the history entry ourselves (if not, "back" would leave the site)
	const pushedRef = useRef(false);

	useEffect(() => startSmoothScroll(), []);

	// Keep the open project in the URL so it can be shared and closed with "back"
	useEffect(() => {
		const onHash = () => setOpenProject(projectFromHash());
		window.addEventListener('hashchange', onHash);
		return () => window.removeEventListener('hashchange', onHash);
	}, []);

	const open = useCallback((slug: string) => {
		const hash = `#projet/${slug}`;
		if (window.location.hash.startsWith('#projet/')) {
			history.replaceState(null, '', hash);
		} else {
			history.pushState(null, '', hash);
			pushedRef.current = true;
		}
		setOpenProject(slug);
	}, []);

	const close = useCallback(() => {
		if (pushedRef.current) history.back();
		else history.replaceState(null, '', window.location.pathname);
		pushedRef.current = false;
		setOpenProject(null);
	}, []);

	return (
		<MotionConfig reducedMotion="user">
			<Preloader />
			<ScrollProgress />
			<Nav />
			<main>
				<Hero />
				<About />
				<StackBand />
				<Projects onOpen={open} />
				<Experience />
				<Skills />
				<Education />
			</main>
			<Contact />
			<ProjectModal slug={openProject} onClose={close} onNavigate={open} />
			<CommandPalette onOpenProject={open} />
			<Toast />
			<Cursor />
			<div className="grain" aria-hidden="true" />
		</MotionConfig>
	);
}
