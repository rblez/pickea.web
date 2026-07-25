export type Currency = 'CUP';

export interface Variant {
	id: string;
	label: string;
	price: number;
}

export interface Product {
	id: string;
	name: string;
	description: string;
	image: string;
	priceUSD: number;
	currencies: Currency[];
	category: string;
	variants?: Variant[];
}

export interface CartItem {
	productId: string;
	variantId?: string;
	quantity: number;
}