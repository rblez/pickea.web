export type Currency = 'CUP';

export interface Variant {
	id: string;
	label: string;
	price: number;
	agotado?: boolean;
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
	agotado?: boolean;
}

export interface CartItem {
	productId: string;
	variantId?: string;
	quantity: number;
}