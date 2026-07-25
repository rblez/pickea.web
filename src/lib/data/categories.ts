export interface Category {
	name: string;
	slug: string;
}

export const categories: Category[] = [
	{ name: 'Juegos', slug: 'juegos' },
	{ name: 'Streaming', slug: 'streaming' },
	{ name: 'Recargas', slug: 'recargas' },
	{ name: 'Suscripciones', slug: 'suscripciones' },
	{ name: 'Licencias', slug: 'licencias' },
	{ name: 'Servicios', slug: 'servicios' },
];
