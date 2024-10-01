import { Platform } from '$lib/types';
import { getSkills } from './skills';

// todo:
// Mettre a jour profil github

// Faire une photo professionnel et mettre sur linkedin, malte, cv, github, portfolio
// Faire site digital express
// Imprimer carte vistaprint

export const title = 'Home';

export const name = 'Idris';

export const lastName = 'Ali';

export const description =
	"Développeur et architecte de système d'informations, je conçois des solutions digitales sur mesure qui allient innovation et performance. A le recherche d'une alternance je suis disponible pour apprendre de votre savoir et de partager vos valeurs. Construisons ensemble l\'avenir de votre entreprise."

export const subDescription =
	'Vous avez ci-dessous différents liens, comme mon Github, Linkedin, mon mail, etc. Pour un premier contact n\'hésitez pas à me contact idéalement par Linkedin / email.'
export const links: Array<{ platform: Platform; link: string }> = [
	{ platform: Platform.GitHub, link: 'https://github.com/Slaain' },
	{
		platform: Platform.Linkedin,
		link: 'https://www.linkedin.com/in/idris-ali-b83a03210/'
	},
	{
		platform: Platform.Email,
		link: 'idris1390@gmail.com'
	}
];

export const skills = getSkills('ansible', 'js', 'ts', 'node', 'express', 'mysql', 'postgres', 'prisma', 'jest', 'reactjs', 'tailwindcss',  'android', 'symfony-most-used','sass',)
