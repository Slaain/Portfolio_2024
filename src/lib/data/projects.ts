import Assets, { getAssetURL } from './assets';
import { getSkills } from './skills';
import type { Project } from '../types';
export const items: Array<Project> = [
	{
		slug: "Demain c'est mieux",
		color: '#573497',
		description:
			"Développement d'une application mobile en React Native, connectée à une base de données MongoDB pour la gestion des données utilisateurs et du contenu. Le backend est structuré autour d'une API REST, avec des routes et des modèles de données définis pour organiser les interactions entre le serveur et la base de données. L'application mobile récupère les informations en temps réel via des requêtes fetch effectuées côté frontend, et utilise des hooks d'état (useState) pour stocker et gérer les données localement, ainsi que des hooks d'effet (useEffect) pour déclencher les appels aux API et gérer les effets secondaires liés à l'interface utilisateur.",
		shortDescription:
			"Réalisation d'une application mobile en react native, ou les utilisateur peuvent se partager des anecdoctes et des photos de leur journée",
		links: [{ to: 'https://github.com/manu13008/frontend-dcm', label: 'Voir le Projet'}],
		logo: Assets.Dcm,
		name: "Demain c'est mieux",
		period: {
			from: new Date(2024, 2, 1),
			to: new Date(2024, 7, 31)
		},
		skills: getSkills('reactjs', 'tailwindcss', 'nginx', 'docker', 'ansible'),
		type: 'Application mobile',
		screenshots: [
			{
				label: 'screen 1',
				src: getAssetURL(Assets.Dcm1)
			},
			{
				label: 'screen 2',
				src: getAssetURL(Assets.Dcm2)
			},
			{
				label: 'screen 3',
				src: getAssetURL(Assets.Dcm3)
			},
			{
				label: 'screen 4',
				src: getAssetURL(Assets.Dcm4)
			}
		],
	},
	{
		slug: 'Site de Shampooing',
		color: '#FF6347',
		description:
			"Projet de développement d'un site e-commerce dédié à la vente de shampooings, construit avec React pour une interface utilisateur dynamique et réactive. Le site utilise une base de données SQL pour gérer les produits, les commandes et les informations clients. Des fonctionnalités supplémentaires ont été implémentées et personnalisées grâce à l'utilisation de JavaScript, permettant une expérience utilisateur optimisée. Le design et les interactions ont été adaptés pour garantir une navigation fluide, tout en améliorant la performance du thème initial. Des optimisations ont été faites pour faciliter la gestion des stocks et des transactions en ligne.",
		shortDescription:
			"Conception d'un site de vente en ligne de shampooings, offrant une expérience utilisateur fluide et personnalisée, avec des fonctionnalités améliorées pour la gestion des produits et des commandes.",
		links: [{ to: 'https://www.imphair.pro/', label: 'Voir le site' }], // Remplacez l'URL par le lien vers le projet réel si disponible
		logo: Assets.Imphair,
		name: "Site IMP'HAIR",
		period: {
			from: new Date(2023, 11, 1),
			to: new Date(2024, 7, 10),
		},
		skills: getSkills('reactjs', 'tailwindcss', 'nginx', 'docker', 'ansible','mysql'),
		type: 'E-commerce',
		screenshots: [
			{
				label: 'screen 1',
				src: getAssetURL(Assets.Imphair1)
			},
		]
	},
	{
		slug: 'Liss Cosmetiques',
		color: '#FF6347',
		description:
			"Réalisation d'un site de vente de produits cosmétique en utilisant la bibliothèque REACT et une base de données SQL, tout en modifiant et rajoutant des fonctionnalités sur le thème grâce à JavaScript",
		shortDescription:
			'Site de cosmétique en ligne, avec des produits de beauté et de mode.',
		links: [{ to: 'https://lisscosmetique.com/', label: 'Voir le site' }], // Remplacez l'URL par le lien vers le projet réel si disponible
		logo: Assets.Lisscosmetiques,
		name: "Site Liss cosmétiques",
		period: {
			from: new Date(2023, 3, 1),
			to: new Date(2023, 10, 10),
		},
		skills: getSkills('reactjs', 'tailwindcss', 'docker', 'ansible','mysql'),
		type: 'E-commerce',
		screenshots: [
			{
				label: 'screen 1',
				src: getAssetURL(Assets.Liss1)
			},
		]
	},
	{
		slug: 'Anime On Fire',
		color: '#1E88E5',
		description:
			"Projet de création d'un site web dédié à une bibliothèque de manga et de japanimation, offrant aux internautes un espace où ils peuvent partager leur passion. Le site a pour objectif d'accroître sa visibilité auprès des fans de culture japonaise, en exploitant un marché en pleine expansion. Des efforts particuliers ont été portés sur l'amélioration de l'expérience utilisateur et l'optimisation de la navigation pour encourager l'engagement et les interactions entre les membres. Un suivi des tendances du marché et des performances a été mis en place pour ajuster les stratégies de contenu et de référencement.",
		shortDescription:
			"Création d'un site de bibliothèque de manga et japanimation, visant à rassembler les fans et à accroître sa visibilité sur un marché en pleine expansion.",
		links: [{ to: 'https://github.com/Slaain/aofsite', label: 'Voir le Projet' }], // Remplacez l'URL par le lien vers le rapport réel si disponible
		logo: Assets.Aof, // Assurez-vous d'avoir un logo approprié pour "La Panthère"
		name: 'Anime On Fire',
		period: {
			from: new Date(2021, 10, 25),
			to: new Date(2022, 6, 10),
		},
		skills: getSkills('symfony-most-used', 'mysql','js'),
		type: 'Site web / Blog',
		screenshots: [
			{
				label: 'screen 1',
				src: getAssetURL(Assets.Aof1)
			},
			{
				label: 'screen 2',
				src: getAssetURL(Assets.Aof2)
			},
			{
				label: 'screen 3',
				src: getAssetURL(Assets.Aof3) },
			{
				label: 'screen 4',
				src: getAssetURL(Assets.Aof4) },
		],
	},
	{
		slug: 'SkMode',
		color: '#FF6347',
		description:
			"Projet de développement d'un site e-commerce en Symfony, dédié à une cliente spécialisée dans le prêt-à-porter. Le site permet la vente en ligne de vêtements avec une interface intuitive pour faciliter l'expérience d'achat. Le backend repose sur une base de données MySQL pour gérer les produits, les utilisateurs et les commandes, tandis que des scripts PHP assurent le traitement des transactions. L'interface utilisateur est dynamique grâce à l'utilisation de JavaScript, offrant une navigation fluide et réactive. Un système de suivi des ventes et des performances a été intégré, permettant d'analyser en temps réel les tendances de vente et d'optimiser les stratégies commerciales.",
		shortDescription:
			"Création d'un site e-commerce pour une cliente de prêt-à-porter, avec suivi des ventes et optimisation des performances pour améliorer l'expérience utilisateur et la visibilité.",
		links: [{ to: 'https://skmode.fr/', label: 'Voir le Projet' }], // Remplacez l'URL par le lien vers le projet réel si disponible
		logo: Assets.Sk, // Assurez-vous d'avoir un logo approprié pour "OhMyFood"
		name: 'SkMode',
		period: {
			from: new Date(2022, 2, 1),
			to: new Date(2022, 5, 1),
		},
		skills: getSkills('js', 'sass','symfony-most-used', 'mysql'),
		type: 'E-commerce',
		screenshots: [
			{
				label: 'screen 1',
				src: getAssetURL(Assets.Sk1)
			},
		]
	},
	{
		slug: 'Projet visuel',
		color: '#FF6347',
		description:
			"Réalisation de tout mes projets visuel réalisé grâce à Adobe Photoshop, Illustrator, Premiere Pro, After Effects, et Illustrator. J'ai également travaillé sur des projets de conception de logos et de marque.",
		shortDescription:
			"Réalisation de tout mes projets visuel réalisé grâce à Adobe Creative Suite.",
		links: [{ to: '../visuel.pdf', label: 'Voir le Projet' }], // Remplacez l'URL par le lien vers le projet réel si disponible
		logo: Assets.Visuel, 
		name: 'Projet visuel',
		period: {
			from: new Date(2022, 2, 1),
			to: new Date(2022, 5, 1),
		},
		skills: getSkills('Photoshop','Illustrator','Premiere Pro','After Effects','Illustrator'),
		type: 'Projet visuel',
		screenshots: [
			{
				label: 'screen 1',
				src: getAssetURL(Assets.Visuel)
			},
		]
	}

];

export const title = 'Projets';
