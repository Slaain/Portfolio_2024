import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface AppState {
	introDone: boolean;
	finishIntro: () => void;
	theme: Theme;
	toggleTheme: () => void;
	paletteOpen: boolean;
	setPaletteOpen: (open: boolean) => void;
	toast: string | null;
	notify: (message: string) => void;
}

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
	const [introDone, setIntroDone] = useState(false);
	const [theme, setTheme] = useState<Theme>(
		() => (document.documentElement.dataset.theme as Theme) ?? 'dark'
	);
	const [paletteOpen, setPaletteOpen] = useState(false);
	const [toast, setToast] = useState<string | null>(null);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute('content', theme === 'dark' ? '#0b0b0c' : '#f4f2ee');
		try {
			localStorage.setItem('theme', theme);
		} catch {
			// storage may be unavailable (private mode)
		}
	}, [theme]);

	useEffect(() => {
		if (!toast) return;
		const id = setTimeout(() => setToast(null), 2200);
		return () => clearTimeout(id);
	}, [toast]);

	const toggleTheme = useCallback(() => {
		const apply = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
		// Circular reveal via the View Transitions API when available
		if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			document.startViewTransition(apply);
		} else {
			apply();
		}
	}, []);

	const value = useMemo<AppState>(
		() => ({
			introDone,
			finishIntro: () => setIntroDone(true),
			theme,
			toggleTheme,
			paletteOpen,
			setPaletteOpen,
			toast,
			notify: setToast
		}),
		[introDone, theme, toggleTheme, paletteOpen, toast]
	);

	return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
	const ctx = useContext(AppStateContext);
	if (!ctx) throw new Error('useAppState must be used inside AppStateProvider');
	return ctx;
}

export async function copyToClipboard(text: string) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}
