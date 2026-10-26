import { useEffect, useState, useSyncExternalStore } from 'react';

export function useMediaQuery(query: string) {
	return useSyncExternalStore(
		(onChange) => {
			const mql = window.matchMedia(query);
			mql.addEventListener('change', onChange);
			return () => mql.removeEventListener('change', onChange);
		},
		() => window.matchMedia(query).matches,
		() => false
	);
}

export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** Live clock for a given IANA time zone, updated every second. */
export function useClock(timeZone: string) {
	const format = () =>
		new Intl.DateTimeFormat('fr-FR', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			timeZone
		}).format(new Date());

	const [time, setTime] = useState(format);

	useEffect(() => {
		const id = setInterval(() => setTime(format()), 1000);
		return () => clearInterval(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeZone]);

	return time;
}

/** Id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: ReadonlyArray<string>) {
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) setActive(entry.target.id);
				}
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, [ids]);

	return active;
}
