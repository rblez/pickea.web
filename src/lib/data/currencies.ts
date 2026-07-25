import type { Currency } from '$lib/types';

export const RATES: Record<Currency, number> = {
	CUP: 1,
};

export const CURRENCY_NAMES: Record<Currency, string> = {
	CUP: 'CUP',
};

export function formatPrice(priceUSD: number, currency: Currency): string {
	return `$${priceUSD.toLocaleString('es-CU')} CUP`;
}