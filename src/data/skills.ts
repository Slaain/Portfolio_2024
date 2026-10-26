import { publicAsset } from '../lib/public-asset'

import type { Skill, SkillCategory } from './types';

const logo = (file: string) => publicAsset(`logos/${file}`);

export const categories: Array<{ slug: SkillCategory; name: string }> = [
	{ slug: 'sysadmin', name: 'Administration système' },
	{ slug: 'devops', name: 'DevOps' },
	{ slug: 'pro-lang', name: 'Langages' },
	{ slug: 'framework-backend', name: 'Backend' },
	{ slug: 'library-frontend', name: 'Frontend' },
	{ slug: 'db', name: 'Bases de données' },
	{ slug: 'test', name: 'Tests' },
	{ slug: 'markup-style', name: 'Markup & Style' },
	{ slug: 'design', name: 'Design' }
];

export const skills: Array<Skill> = [
	{
		slug: 'angular',
		name: 'Angular',
		logo: logo('angular.webp'),
		category: 'library-frontend',
		featured: true,
		description:
			'Angular est un framework TypeScript que j’ai utilisé pour développer des applications web dynamiques et performantes.'
	},
	{
		slug: 'react',
		name: 'React',
		logo: logo('react.svg'),
		category: 'library-frontend',
		featured: true,
		description:
			'React est une bibliothèque JavaScript que j’ai utilisée pour développer des interfaces utilisateur réactives et modulaires.'
	},
	{
		slug: 'react-native',
		name: 'React Native',
		logo: logo('reactnative.svg'),
		category: 'library-frontend',
		featured: true,
		description:
			'React Native est un framework mobile que j’ai utilisé pour développer des applications mobiles natives.'
	},
	{
		slug: 'vue',
		name: 'Vue.js',
		logo: logo('vue.webp'),
		category: 'library-frontend',
		description:
			'Vue.js est un framework JavaScript que j’ai utilisé pour construire des interfaces web, notamment des dashboards de gestion.'
	},
	{
		slug: 'java',
		name: 'Java',
		logo: logo('java.webp'),
		category: 'pro-lang',
		featured: true,
		description:
			'Java est un langage de programmation que j’ai utilisé dans le développement d’applications Android et d’applications backend robustes.'
	},
	{
		slug: 'ts',
		name: 'TypeScript',
		logo: logo('ts.webp'),
		category: 'pro-lang',
		featured: true,
		description:
			'TypeScript est un sur-ensemble typé de JavaScript que j’ai utilisé pour améliorer la robustesse et la maintenabilité du code.'
	},
	{
		slug: 'js',
		name: 'JavaScript',
		logo: logo('js.webp'),
		category: 'pro-lang',
		description:
			'JavaScript est un langage de programmation que j’ai utilisé dans divers projets front-end pour créer des interfaces interactives et dynamiques.'
	},
	{
		slug: 'node',
		name: 'Node.js',
		logo: logo('node.webp'),
		category: 'pro-lang',
		description:
			'Node.js est une plateforme JavaScript côté serveur que j’ai exploitée pour construire des applications backend performantes.'
	},
	{
		slug: 'spring-boot',
		name: 'Spring Boot',
		logo: logo('spring-boot.svg'),
		category: 'framework-backend',
		featured: true,
		description:
			'Spring Boot est un framework Java que j’ai utilisé pour développer des applications backend robustes et évolutives.'
	},
	{
		slug: 'express',
		name: 'Express.js',
		logo: logo('express.webp'),
		category: 'framework-backend',
		featured: true,
		description:
			'Express.js est un framework pour Node.js que j’ai utilisé pour développer des APIs RESTful et des applications web robustes.'
	},
	{
		slug: 'symfony',
		name: 'Symfony',
		logo: logo('symfony.webp'),
		category: 'framework-backend',
		featured: true,
		description:
			'Symfony est un framework PHP que j’ai utilisé pour développer des sites e-commerce et des applications web complètes.'
	},
	{
		slug: 'elixir',
		name: 'Elixir',
		logo: logo('elixirlogo.webp'),
		category: 'framework-backend',
		description:
			'Elixir est un langage de programmation fonctionnel que j’ai utilisé pour développer des applications web robustes et scalables.'
	},
	{
		slug: 'docker',
		name: 'Docker',
		logo: logo('docker.svg'),
		category: 'devops',
		featured: true,
		description:
			'Docker est une plateforme de virtualisation que j’ai utilisée pour containeriser des applications afin de faciliter leur déploiement.'
	},
	{
		slug: 'ansible',
		name: 'Ansible',
		logo: logo('ansible.svg'),
		category: 'devops',
		featured: true,
		description:
			'Ansible est un outil d’automatisation que j’ai utilisé pour orchestrer le déploiement et la configuration des serveurs.'
	},
	{
		slug: 'ci-cd',
		name: 'CI/CD',
		logo: logo('cicd.svg'),
		category: 'devops',
		featured: true,
		description:
			'Toutes mes applications sont dockerisées et déployées automatiquement via des pipelines CI/CD orchestrés avec Ansible.'
	},
	{
		slug: 'terraform',
		name: 'Terraform',
		logo: logo('terraform.webp'),
		category: 'devops',
		description:
			'Terraform est un outil d’infrastructure as code que j’ai utilisé pour provisionner et versionner des infrastructures cloud.'
	},
	{
		slug: 'prometheus',
		name: 'Prometheus',
		logo: logo('prometheus.webp'),
		category: 'devops',
		description:
			'Prometheus est un système de surveillance open-source que j’ai utilisé pour collecter et analyser les métriques des applications.'
	},
	{
		slug: 'grafana',
		name: 'Grafana',
		logo: logo('grafana.svg'),
		category: 'devops',
		description:
			'Grafana est un outil de visualisation que j’ai utilisé pour surveiller la performance des systèmes et applications.'
	},
	{
		slug: 'linux',
		name: 'Linux',
		logo: logo('linux.svg'),
		category: 'sysadmin',
		description:
			'Linux est un système d’exploitation open-source que j’ai utilisé pour gérer les serveurs et les environnements de développement.'
	},
	{
		slug: 'nginx',
		name: 'Nginx',
		logo: logo('nginx.svg'),
		category: 'sysadmin',
		description:
			'Nginx est un serveur web et reverse proxy que j’ai utilisé pour servir des applications web de manière performante.'
	},
	{
		slug: 'mysql',
		name: 'MySQL',
		logo: logo('mysql.svg'),
		category: 'db',
		featured: true,
		description:
			'MySQL est un système de gestion de bases de données relationnelles que j’ai utilisé pour gérer des données structurées dans mes projets.'
	},
	{
		slug: 'postgres',
		name: 'PostgreSQL',
		logo: logo('postgres.webp'),
		category: 'db',
		featured: true,
		description:
			'PostgreSQL est un système de gestion de bases de données open-source que j’ai utilisé pour des applications nécessitant une gestion avancée des données.'
	},
	{
		slug: 'mongodb',
		name: 'MongoDB',
		logo: logo('mongodb.svg'),
		category: 'db',
		description:
			'MongoDB est une base de données NoSQL que j’ai utilisée pour stocker les contenus et les données utilisateurs de mes applications.'
	},
	{
		slug: 'jest',
		name: 'Jest',
		logo: logo('jest.webp'),
		category: 'test',
		description:
			'Jest est un framework de test JavaScript que j’ai utilisé pour assurer la qualité et la fiabilité du code dans mes projets.'
	},
	{
		slug: 'tailwind',
		name: 'Tailwind CSS',
		logo: logo('tailwind.svg'),
		category: 'markup-style',
		description:
			'Tailwind CSS est un framework CSS utilitaire que j’ai utilisé pour créer des interfaces utilisateur modernes et réactives.'
	},
	{
		slug: 'sass',
		name: 'Sass',
		logo: logo('sass.webp'),
		category: 'markup-style',
		description:
			'Sass est un préprocesseur CSS que j’ai employé pour structurer et gérer efficacement les styles complexes dans mes projets.'
	},
	{
		slug: 'css',
		name: 'CSS',
		logo: logo('css.svg'),
		category: 'markup-style',
		description: 'CSS, la base de toutes mes interfaces : mises en page responsives, animations et thèmes.'
	},
	{
		slug: 'photoshop',
		name: 'Photoshop',
		logo: logo('photoshop.svg'),
		category: 'design',
		description: 'Photoshop, utilisé pour mes retouches, flyers et visuels de marque.'
	},
	{
		slug: 'illustrator',
		name: 'Illustrator',
		logo: logo('illustrator.svg'),
		category: 'design',
		description: 'Illustrator, utilisé pour la conception de logos et d’identités visuelles.'
	},
	{
		slug: 'premiere',
		name: 'Premiere Pro',
		logo: logo('premiere.svg'),
		category: 'design',
		description: 'Premiere Pro, utilisé pour le montage de mes projets vidéo.'
	},
	{
		slug: 'after-effects',
		name: 'After Effects',
		logo: logo('after-effects.svg'),
		category: 'design',
		description: 'After Effects, utilisé pour le motion design et les effets visuels.'
	}
];

export const skillBySlug = new Map(skills.map((skill) => [skill.slug, skill]));

export const getSkills = (slugs: Array<string>) =>
	slugs.map((slug) => skillBySlug.get(slug)).filter((skill): skill is Skill => Boolean(skill));
