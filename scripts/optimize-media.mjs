// Converts the raw assets of Portfolio_2024 into lightweight WebP files for Portfolio_2026.
// Usage: npm run media
import { copyFile, mkdir } from 'node:fs/promises';
import { basename, extname, join, resolve } from 'node:path';
import sharp from 'sharp';

const SRC = resolve('../Portfolio_2024/static/logos');
const OUT_SHOTS = resolve('public/media');
const OUT_LOGOS = resolve('public/logos');

const screenshots = [
	'anapixsite.png',
	'goth1.png',
	'goth2.jpg',
	'mok1.jpg',
	'mok2.jpg',
	'mok3.jpg',
	'mok4.jpg',
	'imphair1.png',
	'liss1.png',
	'aof1.png',
	'aof2.png',
	'aof3.png',
	'aof4.png',
	'sk1.png',
	'visuels.png'
];

const logos = [
	// projects & companies
	'anapix.png',
	'bat2.png',
	'logo.png',
	'imphair.png',
	'lisslogo.png',
	'logo_transparent.png',
	'sk.png',
	'concepts.png',
	'vlv.png',
	'epitech.png',
	'lacapsule.png',
	'afpa.jpg',
	// skills
	'ansible.svg',
	'java.png',
	'angular.png',
	'ts.png',
	'spring-boot.svg',
	'express.png',
	'react.svg',
	'Symfony.png',
	'docker.svg',
	'mysql.svg',
	'js.png',
	'sass.png',
	'node.png',
	'postgres.png',
	'jest.png',
	'terraform.png',
	'prometheus.png',
	'grafana.svg',
	'tailwind.svg',
	'linux.svg',
	'reactnative.svg',
	'Elixirlogo.png',
	'vue.png',
	'mongodb.svg',
	'nginx.svg',
	'css.svg',
	'html.svg',
	'kubernetes.svg',
	'photoshop.svg',
	'illustrator.svg',
	'premiere.svg',
	'after-effects.svg'
];

const outName = (file, ext) => basename(file, extname(file)).toLowerCase() + ext;

await mkdir(OUT_SHOTS, { recursive: true });
await mkdir(OUT_LOGOS, { recursive: true });

for (const file of screenshots) {
	await sharp(join(SRC, file))
		.resize({ width: 1800, withoutEnlargement: true })
		.webp({ quality: 78 })
		.toFile(join(OUT_SHOTS, outName(file, '.webp')));
	console.log('shot', file);
}

for (const file of logos) {
	if (file.endsWith('.svg')) {
		await copyFile(join(SRC, file), join(OUT_LOGOS, outName(file, '.svg')));
	} else {
		await sharp(join(SRC, file))
			.resize({ width: 256, height: 256, fit: 'inside', withoutEnlargement: true })
			.webp({ quality: 88 })
			.toFile(join(OUT_LOGOS, outName(file, '.webp')));
	}
	console.log('logo', file);
}
