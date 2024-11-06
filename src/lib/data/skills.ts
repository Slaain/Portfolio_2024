import Assets from './assets';
import type { Skill, SkillCategory } from '../types';
import { omit, type StringWithAutoComplete } from '@riadh-adrani/utils';

const defineSkillCategory = <S extends string>(data: SkillCategory<S>): SkillCategory<S> => data;

const categories = [
	defineSkillCategory({ name: 'Les plus utilisés', slug: 'most-used', order: 0 }),
	defineSkillCategory({ name: 'Administration Système', slug: 'sysadmin', order: 1 }),
	defineSkillCategory({ name: 'DevOps', slug: 'devops', order: 2 }),
	defineSkillCategory({ name: 'Languages de programmation', slug: 'pro-lang', order: 3 }),
	defineSkillCategory({ name: 'Frameworks Backend', slug: 'framework-backend', order: 4 }),
	defineSkillCategory({ name: 'Librairies Frontend ', slug: 'library-frontend', order: 5 }),
	defineSkillCategory({ name: 'Databases', slug: 'db', order: 7 }),
	defineSkillCategory({ name: 'ORMs', slug: 'orm', order: 8 }),

	defineSkillCategory({ name: 'Tests', slug: 'test', order: 9 }),

	defineSkillCategory({ name: 'Markup & Style', slug: 'markup-style', order: 10 }),

	defineSkillCategory({ name: 'Dev Tools', slug: 'devtools', order: 11 }),
	defineSkillCategory({ name: 'Design', slug: 'design', order: 12 }),
	defineSkillCategory({ name: 'Soft Skills', slug: 'soft', order: 13 }),
] as const;

const defineSkill = <S extends string>(
	skill: Omit<Skill<S>, 'category'> & {
		category?: StringWithAutoComplete<(typeof categories)[number]['slug']>;
	}
): Skill<S> => {
	const out: Skill<S> = omit(skill, 'category');

	if (skill.category) {
		out.category = categories.find((it) => it.slug === skill.category);
	}

	return out;
};

export const items = [
	defineSkill({
		slug: 'ansible-most-used',
		color: 'orange',
		description: 'Ansible est un outil d’automatisation que j’ai utilisé pour orchestrer le déploiement et la configuration des serveurs.',
		logo: Assets.Ansible,
		name: 'Ansible',
		category: 'most-used'
	}),
	// defineSkill({
	// 	slug: 'java-most-used',
	// 	color: 'blue',
	// 	description: 'Java est un langage de programmation que j’ai utilisé dans le développement d’applications Android et d’applications backend robustes.',
	// 	logo: Assets.Java,
	// 	name: 'Java',
	// 	category: 'most-used'
	// }),
	defineSkill({
		slug: 'ts-most-used',
		color: 'blue',
		description: 'TypeScript est un sur-ensemble typé de JavaScript que j’ai utilisé pour améliorer la robustesse et la maintenabilité du code.',
		logo: Assets.TypeScript,
		name: 'TypeScript',
		category: 'most-used'
	}),
	// defineSkill({
	// 	slug: 'spring-boot-most-used',
	// 	color: 'green',
	// 	description: 'Spring Boot est un framework Java que j’ai utilisé pour développer des applications backend robustes et évolutives.',
	// 	logo: Assets.SpringBoot,
	// 	name: 'Spring Boot',
	// 	category: 'most-used'
	// }),
	defineSkill({
		slug: 'express-most-used',
		color: 'green',
		description: 'Express.js est un framework pour Node.js que j’ai utilisé pour développer des APIs RESTful et des applications web robustes.',
		logo: Assets.ExpressJs,
		name: 'ExpressJs',
		category: 'most-used'
	}),
	defineSkill({
		slug: 'reactjs-most-used',
		color: 'cyan',
		description: 'React est une bibliothèque JavaScript que j’ai utilisée pour développer des interfaces utilisateur réactives et modulaires.',
		logo: Assets.ReactJs,
		name: 'React Js',
		category: 'most-used'
	}),
	defineSkill({
		slug: 'symfony-most-used',
		color: 'cyan',
		description: 'Symfony est une bibliothèque PHP que j’ai utilisée pour développer des interfaces utilisateur réactives et modulaires.',
		logo: Assets.Symfony,
		name: 'Symfony',
		category: 'most-used'
	}),
	defineSkill({
		slug: 'docker-most-used',
		color: 'cyan',
		description: 'Docker est une plateforme de virtualisation que j’ai utilisé pour containeriser des applications afin de faciliter leur déploiement.',
		logo: Assets.Docker,
		name: 'Docker',
		category: 'most-used'
	}),
	defineSkill({
		slug: 'mysql-most-used',
		color: 'blue',
		description: 'MySQL est un système de gestion de bases de données relationnelles que j’ai utilisé pour gérer des données structurées dans mes projets.',
		logo: Assets.MySql,
		name: 'MySQL',
		category: 'most-used'
	}),
	defineSkill({
		slug: 'js',
		color: 'yellow',
		description: 'JavaScript est un langage de programmation que j’ai utilisé dans divers projets front-end pour créer des interfaces interactives et dynamiques.',
		logo: Assets.JavaScript,
		name: 'JavaScript',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'ts',
		color: 'blue',
		description: 'TypeScript est un sur-ensemble typé de JavaScript que j’ai utilisé pour améliorer la robustesse et la maintenabilité du code.',
		logo: Assets.TypeScript,
		name: 'TypeScript',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'sass',
		color: 'pink',
		description: 'Sass est un préprocesseur CSS que j’ai employé pour structurer et gérer efficacement les styles complexes dans mes projets.',
		logo: Assets.Sass,
		name: 'Sass',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'reactjs',
		color: 'cyan',
		description: 'React est une bibliothèque JavaScript que j’ai utilisée pour développer des interfaces utilisateur réactives et modulaires.',
		logo: Assets.ReactJs,
		name: 'React Js',
		category: 'library-frontend'
	}),
	defineSkill({
		slug: 'node',
		color: 'green',
		description: 'Node.js est une plateforme JavaScript côté serveur que j’ai exploitée pour construire des applications backend performantes.',
		logo: Assets.NodeJs,
		name: 'NodeJs',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'express',
		color: 'green',
		description: 'Express.js est un framework pour Node.js que j’ai utilisé pour développer des APIs RESTful et des applications web robustes.',
		logo: Assets.ExpressJs,
		name: 'ExpressJs',
		category: 'framework-backend'
	}),
	// defineSkill({
	// 	slug: 'java',
	// 	color: 'blue',
	// 	description: 'Java est un langage de programmation que j’ai utilisé dans le développement d’applications Android et d’applications backend robustes.',
	// 	logo: Assets.Java,
	// 	name: 'Java',
	// 	category: 'pro-lang'
	// }),
	// defineSkill({
	// 	slug: 'spring-boot',
	// 	color: 'green',
	// 	description: 'Spring Boot est un framework Java que j’ai utilisé pour développer des applications backend robustes et évolutives.',
	// 	logo: Assets.SpringBoot,
	// 	name: 'Spring Boot',
	// 	category: 'framework-backend'
	// }),
	defineSkill({
		slug: 'mysql',
		color: 'blue',
		description: 'MySQL est un système de gestion de bases de données relationnelles que j’ai utilisé pour gérer des données structurées dans mes projets.',
		logo: Assets.MySql,
		name: 'MySQL',
		category: 'db'
	}),
	defineSkill({
		slug: 'postgres',
		color: 'blue',
		description: 'PostgreSQL est un système de gestion de bases de données open-source que j’ai utilisé pour des applications nécessitant une gestion avancée des données.',
		logo: Assets.PostgreSQL,
		name: 'PostgreSQL',
		category: 'db'
	}),
	defineSkill({
		slug: 'postgres',
		color: 'blue',
		description: 'PostgreSQL est un système de gestion de bases de données open-source que j’ai utilisé pour des applications nécessitant une gestion avancée des données.',
		logo: Assets.PostgreSQL,
		name: 'PostgreSQL',
		category: 'most-used'
	}),
	// defineSkill({
	// 	slug: 'prisma',
	// 	color: 'blue',
	// 	description: 'Prisma est un ORM moderne que j’ai utilisé pour simplifier les interactions entre l’application et la base de données.',
	// 	logo: Assets.Prisma,
	// 	name: 'Prisma',
	// 	category: 'orm'
	// }),
	defineSkill({
		slug: 'jest',
		color: 'red',
		description: 'Jest est un framework de test JavaScript que j’ai utilisé pour assurer la qualité et la fiabilité du code dans mes projets.',
		logo: Assets.Jest,
		name: 'Jest',
		category: 'test'
	}),
	defineSkill({
		slug: 'ansible',
		color: 'orange',
		description: 'Ansible est un outil d’automatisation que j’ai utilisé pour orchestrer le déploiement et la configuration des serveurs.',
		logo: Assets.Ansible,
		name: 'Ansible',
		category: 'devops'
	}),
	// defineSkill({
	// 	slug: 'kubernetes',
	// 	color: 'blue',
	// 	description: 'Kubernetes est un système d’orchestration de conteneurs que j’ai utilisé pour gérer le déploiement et la mise à l’échelle d’applications containerisées.',
	// 	logo: Assets.Kubernetes,
	// 	name: 'Kubernetes',
	// 	category: 'devops'
	// }),
	// defineSkill({
	// 	slug: 'grafana',
	// 	color: 'orange',
	// 	description: 'Grafana est un outil de surveillance et de visualisation que j’ai utilisé pour surveiller la performance des systèmes et applications.',
	// 	logo: Assets.Grafana,
	// 	name: 'Grafana',
	// 	category: 'devops'
	// }),
	// defineSkill({
	// 	slug: 'prometheus',
	// 	color: 'orange',
	// 	description: 'Prometheus est un système de surveillance open-source que j’ai utilisé pour collecter et analyser les métriques des applications.',
	// 	logo: Assets.Prometheus,
	// 	name: 'Prometheus',
	// 	category: 'devops'
	// }),
	// defineSkill({
	// 	slug: 'alertmanager',
	// 	color: 'orange',
	// 	description: 'Alert Manager est un outil de gestion des alertes que j’ai utilisé en conjonction avec Prometheus pour gérer les notifications des incidents.',
	// 	logo: Assets.Prometheus,
	// 	name: 'Alert Manager',
	// 	category: 'devops'
	// }),
	defineSkill({
		slug: 'tailwindcss',
		color: 'blue',
		description: 'Tailwind CSS est un framework CSS utilitaire que j’ai utilisé pour créer des interfaces utilisateur modernes et réactives.',
		logo: Assets.Tailwind,
		name: 'Tailwind',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'linux',
		color: 'orange',
		description: 'Linux est un système d’exploitation open-source que j’ai utilisé pour gérer les serveurs et les environnements de développement.',
		logo: Assets.Linux,
		name: 'Linux',
		category: 'sysadmin'
	}),
	// defineSkill({
	// 	slug: 'nginx',
	// 	color: 'green',
	// 	description: 'Nginx est un serveur web et reverse proxy que j’ai utilisé pour servir des applications web de manière performante.',
	// 	logo: Assets.Nginx,
	// 	name: 'Nginx',
	// 	category: 'others'
	// }),
	 defineSkill({
	 	slug: 'React Native',
		color: 'green',
	 	description: 'React Native est un framework react mobile que j’ai utilisé pour développer des applications mobiles natives.',
	 	logo: Assets.NativeR,
	 	name: 'React Native',
	 	category: 'library-frontend'
	 }),
	defineSkill({
		slug: 'React Native',
		color: 'green',
		description: 'React Native est un framework react mobile que j’ai utilisé pour développer des applications mobiles natives.',
		logo: Assets.NativeR,
		name: 'React Native',
		category: 'most-used'
	}),
	 defineSkill({
		slug: 'elixir',
	 	color: 'blue',
	 	description: 'Elixir est un langage de programmation fonctionnel que j’ai utilisé pour développer des applications web robustes et scalables.',
	 	logo: Assets.Elixir,
	 	name: 'Elixir',
	 	category: 'framework-backend'
	 }),
	// defineSkill({
	// 	slug: 'grpc',
	// 	color: 'blue',
	// 	description: 'gRPC est un framework RPC open-source que j’ai utilisé pour implémenter des services backend efficaces et performants.',
	// 	logo: Assets.Grpc,
	// 	name: 'gRPC',
	// 	category: 'framework-backend'
	// }),
	defineSkill({
		slug: 'docker',
		color: 'blue',
		description: 'Docker est une plateforme de virtualisation que j’ai utilisé pour containeriser des applications afin de faciliter leur déploiement.',
		logo: Assets.Docker,
		name: 'Docker',
		category: 'framework-backend'
	}),
] as const;

export const title = 'Skills';

export const getSkills = (
	...slugs: Array<StringWithAutoComplete<(typeof items)[number]['slug']>>
): Array<Skill> => items.filter((it) => slugs.includes(it.slug));

export const groupByCategory = (
	query: string
): Array<{ category: SkillCategory; items: Array<Skill> }> => {
	const out: Array<{ category: SkillCategory; items: Array<Skill> }> = [];

	const others: Array<Skill> = [];

	items.forEach((item) => {
		if (query.trim() && !item.name.toLowerCase().includes(query.trim().toLowerCase())) return;

		// push to others if item does not have a category
		if (!item.category) {
			others.push(item);
			return;
		}

		// check if category exists
		let category = out.find((it) => it.category.slug === item.category?.slug);

		if (!category) {
			category = { items: [], category: item.category };

			out.push(category);
		}

		category.items.push(item);
	});

	if (others.length !== 0) {
		out.push({ category: { name: 'Others', slug: 'others', order: 14 }, items: others });
	}

	out.sort((a, b) => a.category.order - b.category.order);

	return out;
};

