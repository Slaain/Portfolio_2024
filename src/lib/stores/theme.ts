import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const key = '@riadh-adrani-theme';

// Mettre à jour le stockage local avec la valeur actuelle du thème
const updateLocalStorage = (value: boolean) => {
	if (browser) {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

// Définir le thème par défaut sur dark
export const theme = writable<boolean>(true);

export const toggleTheme = (value?: boolean) =>
	theme.update((it) => {
		const $v = typeof value === 'boolean' ? value : !it;

		updateLocalStorage($v);

		// Appliquer le thème au root
		document.querySelector(':root')?.setAttribute('data-theme', $v ? 'dark' : 'light');

		return $v;
	});

export const onHydrated = () => {
	const fromStore = localStorage.getItem(key);

	if (!fromStore) {
		// Si aucune préférence n'est stockée, appliquer le mode sombre par défaut
		toggleTheme(true);
	} else {
		// Appliquer la préférence stockée
		toggleTheme(JSON.parse(fromStore));
	}
};
