export const sections = [
	{ id: 'apropos', label: 'À propos' },
	{ id: 'projets', label: 'Projets' },
	{ id: 'parcours', label: 'Parcours' },
	{ id: 'competences', label: 'Compétences' },
	{ id: 'formation', label: 'Formation' },
	{ id: 'contact', label: 'Contact' }
] as const;

export const navSections = sections.filter((s) => s.id !== 'formation');

export const sectionIds = sections.map((s) => s.id);
