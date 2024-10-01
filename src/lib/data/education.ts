import Assets from './assets';
import type { Education } from '../types';

export const items: Array<Education> = [
	{
		degree: "Master Pro Cloud ",
		description: 'Formation axée sur le développement de compétences avancées en informatique, couvrant un large éventail de sujets techniques et théoriques. Cette formation inclut des projets pratiques, des stages, et l\'acquisition de compétences en gestion de projets IT.',
		location: 'France',
		logo: Assets.Epitech,
		name: 'EPITECH - European Institute of Technology',
		organization: 'EPITECH',
		period: { from: new Date(2024, 1, 1), to: new Date(2026, 1, 0) }, // assuming it covers the whole year 2022	
		shortDescription: 'Maîtrise en informatique avec un accent sur le développement, l\'infrastructure cloud, et les nouvelles technologies.',
		slug: 'epitech-masters-degree',
		subjects: ['Linux', 'Microsoft Azure', 'Ansible', 'Kubernetes', 'Docker', 'Grafana', 'Prometheus.io', 'JavaScript', 'TypeScript', 'Java', 'Node.js', 'Express.js', 'Spring Boot', 'MySQL', 'PostgreSQL', 'Prisma', 'React.js', 'Gestion de projet', 'Méthodes agiles', 'GitLab']
	},
	{
		degree: "Concepteur développeur d'application web & web mobile (Bac +4)",
		description: 'Programme intensif couvrant les fondamentaux de la programmation et du développement informatique en React et React native en passant par NodeJs et MongoDb. Ce diplôme a permis de consolider mes compétences en développement web et en gestion de projets techniques.',
		location: 'France',
		logo: Assets.Lacapsule,
		name: 'La capule',
		organization: 'Marseille, La capsule',
		period: { from: new Date(2024, 1, 1), to: new Date(2024, 8, 31) }, 
		shortDescription: 'Diplôme supérieur en développement informatique, avec un accent sur la programmation et les technologies web.',
		slug: 'la capsule-diplome-de-developpeur-web',
		subjects: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Sass', 'Accessibilité W3C', 'Gestion de projets', 'Typescript']
	},
	{
		degree: "Développeur web et web mobile (Bac +2)",
		description: 'Programme intensif couvrant les fondamentaux de la programmation et du développement informatique en React et React native en passant par NodeJs et MongoDb. Ce diplôme a permis de consolider mes compétences en développement web et en gestion de projets techniques.',
		location: 'Marseille, France',
		logo: Assets.Afpa,
		name: 'A.F.P.A',
		organization: 'A.F.P.A',
		period: { from: new Date(2021, 1, 1), to: new Date(2022, 2, 1) }, 
		shortDescription: 'Diplôme supérieur en développement informatique, avec un accent sur la programmation et les technologies web.',
		slug: 'la capsule-diplome-de-developpeur-web',
		subjects: ['HTML', 'CSS', 'JavaScript', 'Symfony', 'PHP', 'Mysql', 'PostegreSQL', 'Sass', 'Accessibilité W3C', 'Gestion de projets', 'Angular','Tailwindcss']
	},
];

export const title = 'Education';
