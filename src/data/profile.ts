import { publicAsset } from '../lib/public-asset'

export const profile = {
	firstName: 'Idris',
	lastName: 'Ali',
	role: "Architecte des systèmes d'information",
	roleAlt: 'Développeur full-stack',
	location: 'Marseille, France',
	timeZone: 'Europe/Paris',
	email: 'idris1390@gmail.com',
	phone: '07 67 43 05 75',
	phoneHref: 'tel:+33767430575',
	cv: publicAsset('cv.pdf'),
	description:
		"Développeur et architecte de systèmes d'information, je conçois des solutions digitales sur mesure qui allient innovation et performance. En freelance, je conçois et mets à jour des solutions informatiques. Construisons ensemble l'avenir de votre entreprise.",
	subDescription:
		"Pour un premier contact, n'hésitez pas à me joindre idéalement par LinkedIn, par email ou par téléphone.",
	links: [
		{ label: 'GitHub', href: 'https://github.com/Slaain', handle: '@Slaain' },
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/idris-ali-b83a03210/',
			handle: 'idris-ali'
		}
	]
} as const;
