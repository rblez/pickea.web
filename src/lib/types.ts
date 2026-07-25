export type Currency = 'CUP';

export interface Product {
	id: number;
	name: string;
	description: string;
	image: string;
	priceUSD: number;
	currencies: Currency[];
	category: string;
	unitSize?: number;
	discount?: number;
}

export interface CartItem {
	productId: number;
	quantity: number;
}

export type Route = '/' | '/products' | '/cart' | '/checkout';
