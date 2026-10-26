export type YearMonth = `${number}-${number}`;

export interface Period {
	from: YearMonth;
	to?: YearMonth;
}

export type SkillCategory =
	| 'sysadmin'
	| 'devops'
	| 'pro-lang'
	| 'framework-backend'
	| 'library-frontend'
	| 'db'
	| 'test'
	| 'markup-style'
	| 'design';

export interface Skill {
	slug: string;
	name: string;
	logo: string;
	category: SkillCategory;
	description: string;
}

export interface Media {
	src: string;
	label: string;
	kind: 'image' | 'video';
	orientation: 'landscape' | 'portrait';
}

export interface Project {
	slug: string;
	name: string;
	type: string;
	color: string;
	logo: string;
	period: Period;
	shortDescription: string;
	description: string;
	link?: { to: string; label: string };
	stack: Array<string>;
	media: Array<Media>;
}

export interface Experience {
	slug: string;
	role: string;
	company: string;
	contract: string;
	location: string;
	logo: string;
	period: Period;
	shortDescription: string;
	description: string;
	tags: Array<string>;
}

export interface Education {
	slug: string;
	degree: string;
	school: string;
	location: string;
	logo: string;
	period: Period;
	shortDescription: string;
	description: string;
	subjects: Array<string>;
}
