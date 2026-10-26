import { publicAsset } from '../lib/public-asset'
import type { Education } from './types';

export const education: Array<Education> = [
	{
		slug: 'epitech',
		degree: 'Master Pro Cloud (Master 2, Bac +6)',
		school: 'EPITECH — European Institute of Technology',
		location: 'France',
		logo: publicAsset('logos/epitech.webp'),
		period: { from: '2024-02', to: '2026-01' },
		shortDescription:
			"Maîtrise en informatique avec un accent sur le développement, l'infrastructure cloud et les nouvelles technologies.",
		description:
			"Formation axée sur le développement de compétences avancées en informatique, couvrant un large éventail de sujets techniques et théoriques. Cette formation inclut des projets pratiques, des stages et l'acquisition de compétences en gestion de projets IT.",
		subjects: [
			'Linux',
			'Microsoft Azure',
			'Ansible',
			'Kubernetes',
			'Docker',
			'Grafana',
			'Prometheus',
			'JavaScript',
			'TypeScript',
			'Java',
			'Node.js',
			'Express.js',
			'Spring Boot',
			'MySQL',
			'PostgreSQL',
			'Prisma',
			'React.js',
			'Gestion de projet',
			'Méthodes agiles',
			'GitLab'
		]
	},
	{
		slug: 'la-capsule',
		degree: "Concepteur développeur d'applications web & web mobile (Bac +4)",
		school: 'La Capsule',
		location: 'Marseille, France',
		logo: publicAsset('logos/lacapsule.webp'),
		period: { from: '2024-02', to: '2024-09' },
		shortDescription:
			'Diplôme supérieur en développement informatique, avec un accent sur la programmation et les technologies web.',
		description:
			'Programme intensif couvrant les fondamentaux de la programmation et du développement informatique, de React et React Native à Node.js et MongoDB. Ce diplôme a permis de consolider mes compétences en développement web et en gestion de projets techniques.',
		subjects: [
			'HTML',
			'CSS',
			'JavaScript',
			'TypeScript',
			'React.js',
			'Node.js',
			'Express.js',
			'MongoDB',
			'Sass',
			'Accessibilité W3C',
			'Gestion de projets'
		]
	},
	{
		slug: 'afpa',
		degree: 'Développeur web et web mobile (Bac +2)',
		school: 'A.F.P.A',
		location: 'Marseille, France',
		logo: publicAsset('logos/afpa.webp'),
		period: { from: '2021-02', to: '2022-03' },
		shortDescription:
			'Diplôme en développement informatique, avec un accent sur la programmation et les technologies web.',
		description:
			'Programme intensif couvrant les fondamentaux de la programmation et du développement web, du front-end avec Angular au back-end avec Symfony et PHP. Ce diplôme a posé les bases de mes compétences en développement web et en gestion de projets techniques.',
		subjects: [
			'HTML',
			'CSS',
			'JavaScript',
			'Symfony',
			'PHP',
			'MySQL',
			'PostgreSQL',
			'Sass',
			'Angular',
			'Tailwind CSS',
			'Accessibilité W3C',
			'Gestion de projets'
		]
	}
];
