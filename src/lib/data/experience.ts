import Assets from './assets';
import { getSkills } from './skills';
import { ContractType, type Experience } from '../types';

export const items: Array<Experience> = [
	{
		slug: '99Concepts',
		company: '99Concepts',
		description: "En tant que Developpeur junior pour 99Concepts, j'ai dirigé la continuité de la transformation numérique , transformant ainsi un processus manuel et chronophage en une solution numérique robuste et intuitive.",
		contract: ContractType.FullTime,
		type: 'Project Management',
		location: 'Vitrolles, France',
		period: { from: new Date(2022, 10, 1), to: new Date(2023, 3, 31) }, // assuming the project started in December 2023 and is ongoing
		skills: getSkills('reac', 'android', 'project-management'),
		name: 'Développeur junior',
		color: '#3478f6',
		links: [],
		logo: Assets.Concepts,
		shortDescription: "Conception et réalisation de sites web pour des startups de mode et de prêt-à-porter, en mettant l'accent sur une expérience utilisateur moderne et des fonctionnalités e-commerce adaptées à leurs besoins."
	},
	{
		slug: '99Concepts',
		company: '99Concepts',
		description: "En tant que stagiaire Developpeur  pour 99Concepts, j'ai pu participé à la continuité de la transformation numérique de plusieurs site d'E-commerce.Ces applications, développée en React et XML pour les tablettes Android, a permis d'automatiser et de sécuriser la gestion des données sensibles tel que les données des clients.Mon rôle a impliqué la conception architecturale, le développement logiciel, et la mise en œuvre de l'application sur le terrain, avec un focus particulier sur l'optimisation des performances et la fiabilité.De plus, j'ai assuré la maintenance continue.",
		contract: ContractType.Internship,
		type: 'Stagiaire developpeur',
		location: 'Vitrolles, France',
		period: { from: new Date(2021, 10, 1), to: new Date(2022, 7, 31) }, // assuming the project started in December 2023 and is ongoing
		skills: getSkills('java', 'android', 'project-management'),
		name: 'Stagiaire Développeur',
		color: '#3478f6',
		links: [],
		logo: Assets.Concepts,
		shortDescription: " Conception et réalisation de sites web pour des startups de mode et de prêt-à-porter, en mettant l'accent sur une expérience utilisateur moderne et des fonctionnalités e-commerce adaptées à leurs besoins."
	},
	{
		slug: 'Vatos Locos Vidéos',
		company: 'Vatos Locos Vidéos',
		description: "Au sein de l'association audiovisuelle Vatos Locos, j'étais chargé de la réalisation de tous leurs projets visuels. Cela incluait la création de flyers pour la promotion des ateliers et événements, ainsi que la refonte visuelle de leurs outils, tels que des chapiteaux et des vêtements, entièrement redessinés. J'ai également pris en charge la conception de tee-shirts et autres supports vestimentaires.Ces projets ont permis de renforcer l'identité et la valeur de Vatos Locos Vidéos, en créant une image de qualité et une expérience utilisateur cohérente.",
		contract: ContractType.FullTime,
		type: 'Animateur audiovisuel',
		location: 'Vitrolles, France',
		period: { from: new Date(2017, 7, 1), to: new Date(2018, 7, 31) }, // assuming this project ran through the year 2023
		skills: getSkills('ruby-on-rails', 'grpc'),
		name: 'Animateur audiovisuel',
		color: '#8e44ad',
		links: [],
		logo: Assets.Vlv,
		shortDescription: "Responsable des projets visuels de l'association Vatos Locos, incluant la conception de flyers, la refonte de leurs outils et vêtements, ainsi que l'accompagnement de jeunes dans la réalisation de films primés en festival"
	}
];

export const title = 'Experience';