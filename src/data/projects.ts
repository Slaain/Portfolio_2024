import { publicAsset } from '../lib/public-asset'

import type { Media, Project } from './types';

// Every application is containerised and shipped through Ansible-driven CI/CD pipelines
const deployed = (...stack: Array<string>) => [...new Set([...stack, 'docker', 'ansible', 'ci-cd'])];

const shot = (file: string, label: string, orientation: Media['orientation'] = 'landscape'): Media => ({
	src: publicAsset(`media/${file}`),
	label,
	kind: 'image',
	orientation
});

export const projects: Array<Project> = [
	{
		slug: 'undercowhite',
		name: 'Undercowhite',
		type: 'Jeu social web & mobile',
		color: '#ff2d95',
		logo: publicAsset('logos/undercowhite.webp'),
		period: { from: '2026-06', to: '2026-06' },
		shortDescription:
			'Undercowhite est un jeu social de bluff en ligne, inspiré des jeux de mots cachés : on crée une partie, on partage un code et on joue entre amis, de 3 à 20 joueurs.',
		description:
			"Undercowhite est un jeu d'ambiance basé sur la déduction, les indices et le bluff. Chaque joueur reçoit un mot en secret : les civils partagent le même, les infiltrés en reçoivent un légèrement différent et les Mr White n'en reçoivent aucun. À tour de rôle, chacun donne un indice, puis le groupe vote pour démasquer les imposteurs.\n\nLa version web permet de jouer à distance ou dans la même pièce grâce à un simple code de partie : l'hôte configure le mode, les rôles et les mots, puis chaque joueur garde son rôle sur son propre écran. Le jeu propose plus de 590 paires de mots réparties en packs thématiques (Otaku, Pop culture, Marseille, Films, Football, Rap FR…), trois rôles uniques, et existe aussi en application mobile sur Google Play et l'App Store.\n\nLe front est développé en Angular ; l'application est dockerisée et déployée automatiquement via des pipelines CI/CD orchestrés avec Ansible.",
		link: { to: 'https://www.undercowhite.com/', label: 'Jouer sur le site' },
		stack: deployed('angular', 'ts'),
		media: [
			shot('undercowhite1.webp', 'Accueil'),
			shot('undercowhite2.webp', 'Les règles'),
			shot('undercowhite3.webp', 'Version mobile', 'portrait')
		]
	},
	{
		slug: 'livreverso',
		name: 'Livreverso',
		type: 'Site web & application mobile',
		color: '#b34754',
		logo: publicAsset('media/livreverso.webp'),
		period: { from: '2026-10' },
		shortDescription:
			'Un projet pour relier le livre papier à ses versions numériques : identifiez un ouvrage par son code-barres ou son ISBN, puis lisez ou écoutez sur téléphone.',
		description:
			"Le site vitrine présente un parcours en trois gestes : scanner le code-barres du livre (ou saisir son ISBN), choisir une version disponible — édition originale, traduction ou audio — puis lire ou écouter sur téléphone. L’application mobile est conçue pour reprendre la lecture là où on l’a laissée.\n\nLe lancement propose gratuitement les œuvres du domaine public en texte intégral, en audio et en traductions libres. Pour les livres récents, le projet prévoit un code unique imprimé dans chaque exemplaire, qui donnera accès à sa version numérique après l’achat papier.\n\nLe site vitrine est développé avec Next.js et Tailwind CSS ; l’application mobile associée avec React Native. Le service est actuellement en pré-lancement et recueille les inscriptions à sa liste d’attente.",
		link: { to: 'https://livreverso.fr/', label: 'Découvrir Livreverso' },
		stack: ['nextjs', 'react-native', 'tailwind', 'postgres', 'docker', 'ansible', 'ci-cd'],
		media: [shot('livreverso.webp', 'Accueil du site Livreverso')]
	},
	{
		slug: 'garage-davtyan-vardanyan',
		name: 'Garage Davtyan & Vardanyan',
		type: 'Site vitrine',
		color: '#d7192f',
		logo: publicAsset('logos/garage.webp'),
		period: { from: '2025-12', to: '2025-12' },
		shortDescription:
			'Site vitrine d’un garage de carrosserie, peinture et mécanique à Marseille (13011), pensé pour transformer les visiteurs en prises de rendez-vous.',
		description:
			"Conception et développement du site du Garage Davtyan & Vardanyan, spécialiste carrosserie, peinture et mécanique à Marseille. Le site présente l'atelier de 600 m², les services (réparation après sinistre, débosselage sans peinture, rénovation d'optiques, petite mécanique, prêt de véhicule) et les réalisations du garage, avec un carrousel photo en page d'accueil.\n\nL'objectif était de générer des contacts : boutons « Prendre RDV » et numéro de téléphone accessibles en permanence, formulaire de contact, avis Google, partenaires assurances, horaires et plan d'accès. Le site est développé en Angular, entièrement responsive et optimisé pour le référencement local. Il est dockerisé et déployé automatiquement via des pipelines CI/CD orchestrés avec Ansible.",
		link: { to: 'https://www.garage-davtyan-vardanyan.fr/', label: 'Voir le site' },
		stack: deployed('angular', 'ts', 'css'),
		media: [
			shot('garage1.webp', 'Accueil'),
			shot('garage2.webp', 'Services'),
			shot('garage3.webp', 'Page services'),
			shot('garage4.webp', 'Version mobile', 'portrait')
		]
	},
	{
		slug: 'anapix-medical',
		name: 'Anapix Medical',
		type: 'Site vitrine',
		color: '#3478f6',
		logo: publicAsset('logos/anapix.webp'),
		period: { from: '2025-03', to: '2025-04' },
		shortDescription:
			"Développement du site vitrine Anapix Medical, réalisé en Angular avec une base de données MongoDB pour la gestion des contenus. Le site met en avant les solutions de l’entreprise à travers une interface claire et moderne, offrant une navigation fluide et une présentation adaptée aux besoins des professionnels de santé.",
		description:
			"Anapix Medical est un site vitrine conçu pour présenter les solutions de l’entreprise. Réalisé avec Angular côté frontend, il offre une interface claire et accessible pour mettre en valeur les services proposés. Le backend repose sur une base de données MongoDB, permettant la gestion et la mise à jour des contenus. Cette architecture assure une présentation fluide et une maintenance simplifiée du site.",
		link: { to: 'https://anapix-medical.com/', label: 'Voir le site' },
		stack: deployed('angular', 'css', 'nginx', 'mongodb'),
		media: [shot('anapixsite.webp', 'Page d’accueil')]
	},
	{
		slug: 'gothime-manager',
		name: 'Gothime Manager',
		type: 'Web app managers + app mobile employés',
		color: '#f5df4d',
		logo: publicAsset('logos/bat2.webp'),
		period: { from: '2024-11', to: '2024-11' },
		shortDescription:
			"Une application mobile en React Native dédiée aux employés pour le suivi de leurs horaires de travail, et un site en Vue.js pour les managers. Pointage via QR code et statistiques en temps réel.",
		description:
			"GoThime Manager est une solution complète de gestion des horaires de travail, construite en Vue.js pour le site destiné aux managers et administrateurs, et en React Native pour l'application mobile dédiée aux employés. L'interface des managers permet le suivi des statistiques et la gestion des arrivées et retards des employés. Quant à l'application mobile, elle facilite le pointage d'entrée et de sortie via un QR code, avec des graphiques dynamiques créés grâce à VueChart.\n\nCôté backend, le projet repose sur Elixir (Phoenix), offrant une API REST pour gérer les échanges avec une base de données PostgreSQL. Les requêtes API sont exécutées avec Axios, assurant une récupération des données en temps réel, tandis que Docker est utilisé pour standardiser l'environnement de déploiement et faciliter la gestion des serveurs.",
		link: { to: 'https://github.com/Slaain/Gothime-Manager', label: 'Voir sur GitHub' },
		stack: deployed('vue', 'react-native', 'elixir', 'postgres', 'tailwind', 'nginx'),
		media: [
			shot('goth1.webp', 'Dashboard manager'),
			{ src: publicAsset('media/gothtime.mp4'), label: 'Démo vidéo', kind: 'video', orientation: 'landscape' },
			shot('goth2.webp', 'Application mobile', 'portrait')
		]
	},
	{
		slug: 'demain-cest-mieux',
		name: "Demain c'est mieux",
		type: 'Application mobile',
		color: '#ff6347',
		logo: publicAsset('logos/logo.webp'),
		period: { from: '2024-03', to: '2024-08' },
		shortDescription:
			"Réalisation d'une application mobile en React Native, où les utilisateurs peuvent se partager des anecdotes et des photos de leur journée.",
		description:
			"Développement d'une application mobile en React Native, connectée à une base de données MongoDB pour la gestion des données utilisateurs et du contenu. Le backend est structuré autour d'une API REST, avec des routes et des modèles de données définis pour organiser les interactions entre le serveur et la base de données. L'application mobile récupère les informations en temps réel via des requêtes fetch effectuées côté frontend, et utilise des hooks d'état (useState) pour stocker et gérer les données localement, ainsi que des hooks d'effet (useEffect) pour déclencher les appels aux API et gérer les effets secondaires liés à l'interface utilisateur.",
		link: { to: 'https://github.com/manu13008/frontend-dcm', label: 'Voir sur GitHub' },
		stack: deployed('react-native', 'mongodb', 'express', 'node'),
		media: [
			shot('mok1.webp', 'Écran 1', 'portrait'),
			shot('mok2.webp', 'Écran 2', 'portrait'),
			shot('mok3.webp', 'Écran 3', 'portrait'),
			shot('mok4.webp', 'Écran 4', 'portrait')
		]
	},
	{
		slug: 'imphair',
		name: "IMP'HAIR",
		type: 'E-commerce',
		color: '#f4cfdf',
		logo: publicAsset('logos/imphair.webp'),
		period: { from: '2023-12', to: '2024-08' },
		shortDescription:
			"Conception d'un site de vente en ligne de shampooings, offrant une expérience utilisateur fluide et personnalisée, avec des fonctionnalités améliorées pour la gestion des produits et des commandes.",
		description:
			"Projet de développement d'un site e-commerce dédié à la vente de shampooings, construit avec React pour une interface utilisateur dynamique et réactive. Le site utilise une base de données SQL pour gérer les produits, les commandes et les informations clients. Des fonctionnalités supplémentaires ont été implémentées et personnalisées grâce à JavaScript, permettant une expérience utilisateur optimisée. Le design et les interactions ont été adaptés pour garantir une navigation fluide, tout en améliorant la performance du thème initial. Des optimisations ont été faites pour faciliter la gestion des stocks et des transactions en ligne.",
		link: { to: 'https://www.imphair.pro/', label: 'Voir le site' },
		stack: deployed('react', 'tailwind', 'mysql', 'nginx'),
		media: [shot('imphair1.webp', 'Boutique')]
	},
	{
		slug: 'liss-cosmetiques',
		name: 'Liss Cosmétiques',
		type: 'E-commerce',
		color: '#d4d3dc',
		logo: publicAsset('logos/lisslogo.webp'),
		period: { from: '2023-04', to: '2023-11' },
		shortDescription: 'Site de cosmétique en ligne, avec des produits de beauté et de mode.',
		description:
			"Réalisation d'un site de vente de produits cosmétiques en utilisant la bibliothèque React et une base de données SQL, tout en modifiant et rajoutant des fonctionnalités sur le thème grâce à JavaScript.",
		link: { to: 'https://lisscosmetique.com/', label: 'Voir le site' },
		stack: deployed('react', 'tailwind', 'mysql'),
		media: [shot('liss1.webp', 'Boutique')]
	},
	{
		slug: 'anime-on-fire',
		name: 'Anime On Fire',
		type: 'Site web / Blog',
		color: '#ff6347',
		logo: publicAsset('logos/logo_transparent.webp'),
		period: { from: '2021-11', to: '2022-07' },
		shortDescription:
			"Création d'un site de bibliothèque de manga et japanimation, visant à rassembler les fans et à accroître sa visibilité sur un marché en pleine expansion.",
		description:
			"Projet de création d'un site web dédié à une bibliothèque de manga et de japanimation, offrant aux internautes un espace où ils peuvent partager leur passion. Le site a pour objectif d'accroître sa visibilité auprès des fans de culture japonaise, en exploitant un marché en pleine expansion. Des efforts particuliers ont été portés sur l'amélioration de l'expérience utilisateur et l'optimisation de la navigation pour encourager l'engagement et les interactions entre les membres. Un suivi des tendances du marché et des performances a été mis en place pour ajuster les stratégies de contenu et de référencement.",
		link: { to: 'https://github.com/Slaain/aofsite', label: 'Voir sur GitHub' },
		stack: deployed('symfony', 'mysql', 'js'),
		media: [
			shot('aof1.webp', 'Accueil'),
			shot('aof2.webp', 'Catalogue'),
			shot('aof4.webp', 'Fiche'),
			shot('aof3.webp', 'Détail')
		]
	},
	{
		slug: 'projet-visuel',
		name: 'Projets visuels',
		type: 'Direction artistique',
		color: '#a7001e',
		logo: publicAsset('media/visuels.webp'),
		period: { from: '2022-03', to: '2022-06' },
		shortDescription: 'Réalisation de tous mes projets visuels grâce à la suite Adobe Creative Cloud.',
		description:
			"Réalisation de tous mes projets visuels grâce à Adobe Photoshop, Illustrator, Premiere Pro et After Effects. J'ai également travaillé sur des projets de conception de logos et de marque.",
		link: { to: publicAsset('visuel.pdf'), label: 'Voir le book (PDF)' },
		stack: ['photoshop', 'illustrator', 'premiere', 'after-effects'],
		media: [shot('visuels.webp', 'Planche de visuels')]
	}
];
