import { publicAsset } from '../lib/public-asset'
import type { Experience } from './types';

export const experiences: Array<Experience> = [
	{
		slug: 'anapix-medical',
		role: "Alternant architecte des systèmes d'information",
		company: 'Anapix Medical',
		contract: 'Alternance',
		location: 'Meyreuil, France',
		logo: publicAsset('logos/anapix.webp'),
		period: { from: '2025-02', to: '2026-09' },
		shortDescription:
			'Conception et réalisation de solutions web pour le secteur médical, en mettant l’accent sur une expérience utilisateur intuitive et des fonctionnalités adaptées aux besoins des professionnels de santé.',
		description:
			"En tant qu'architecte des systèmes d'information, j'ai contribué à la mise à jour des outils internes, j'ai créé le site internet représentant l'entreprise et plusieurs outils internes pour améliorer la gestion des données médicales et administratives. J'ai également participé à la mise en place de solutions de sécurité pour protéger les informations sensibles des patients.",
		tags: ['Angular', 'Java', 'Docker', 'Sécurité des données']
	},
	{
		slug: '99concepts-junior',
		role: 'Développeur junior',
		company: '99Concepts',
		contract: 'Temps plein',
		location: 'Vitrolles, France',
		logo: publicAsset('logos/concepts.webp'),
		period: { from: '2022-11', to: '2023-04' },
		shortDescription:
			"Conception et réalisation de sites web pour des startups de mode et de prêt-à-porter, en mettant l'accent sur une expérience utilisateur moderne et des fonctionnalités e-commerce adaptées à leurs besoins.",
		description:
			"En tant que développeur junior pour 99Concepts, j'ai dirigé la continuité de la transformation numérique, transformant ainsi un processus manuel et chronophage en une solution numérique robuste et intuitive.",
		tags: ['React', 'Android', 'Gestion de projet']
	},
	{
		slug: '99concepts-stage',
		role: 'Stagiaire développeur',
		company: '99Concepts',
		contract: 'Stage',
		location: 'Vitrolles, France',
		logo: publicAsset('logos/concepts.webp'),
		period: { from: '2021-11', to: '2022-08' },
		shortDescription:
			"Conception et réalisation de sites web pour des startups de mode et de prêt-à-porter, en mettant l'accent sur une expérience utilisateur moderne et des fonctionnalités e-commerce adaptées à leurs besoins.",
		description:
			"En tant que stagiaire développeur pour 99Concepts, j'ai participé à la continuité de la transformation numérique de plusieurs sites d'e-commerce. Ces applications, développées en React et XML pour les tablettes Android, ont permis d'automatiser et de sécuriser la gestion des données sensibles telles que les données des clients. Mon rôle a impliqué la conception architecturale, le développement logiciel et la mise en œuvre de l'application sur le terrain, avec un focus particulier sur l'optimisation des performances et la fiabilité. De plus, j'ai assuré la maintenance continue.",
		tags: ['Java', 'Android', 'React', 'Gestion de projet']
	},
	{
		slug: 'vatos-locos',
		role: 'Animateur audiovisuel',
		company: 'Vatos Locos Vidéos',
		contract: 'Temps plein',
		location: 'Vitrolles, France',
		logo: publicAsset('logos/vlv.webp'),
		period: { from: '2017-08', to: '2018-08' },
		shortDescription:
			"Responsable des projets visuels de l'association Vatos Locos, incluant la conception de flyers, la refonte de leurs outils et vêtements, ainsi que l'accompagnement de jeunes dans la réalisation de films primés en festival.",
		description:
			"Au sein de l'association audiovisuelle Vatos Locos, j'étais chargé de la réalisation de tous leurs projets visuels. Cela incluait la création de flyers pour la promotion des ateliers et événements, ainsi que la refonte visuelle de leurs outils, tels que des chapiteaux et des vêtements, entièrement redessinés. J'ai également pris en charge la conception de tee-shirts et autres supports vestimentaires. Ces projets ont permis de renforcer l'identité et la valeur de Vatos Locos Vidéos, en créant une image de qualité et une expérience cohérente.",
		tags: ['Design graphique', 'Vidéo', 'Identité visuelle']
	}
];
