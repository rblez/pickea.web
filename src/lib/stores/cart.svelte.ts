import type { CartItem } from '$lib/types';

const STORAGE_KEY = 'pickea-cart';

function loadCart(): CartItem[] {
	if (typeof window === 'undefined') return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

function saveCart(items: CartItem[]) {
	if (typeof window === 'undefined') return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function createCartStore() {
	let items = $state<CartItem[]>([]);

	function init() {
		items = loadCart();
	}

	function addItem(productId: string, variantId?: string) {
		const existing = items.find(
			(i) => i.productId === productId && i.variantId === (variantId ?? undefined)
		);
		if (existing) {
			existing.quantity += 1;
		} else {
			items.push({ productId, variantId: variantId ?? undefined, quantity: 1 });
		}
		saveCart(items);
	}

	function removeItem(productId: string, variantId?: string) {
		items = items.filter(
			(i) => !(i.productId === productId && i.variantId === (variantId ?? undefined))
		);
		saveCart(items);
	}

	function updateQuantity(productId: string, quantity: number, variantId?: string) {
		if (quantity <= 0) {
			removeItem(productId, variantId);
			return;
		}
		const item = items.find(
			(i) => i.productId === productId && i.variantId === (variantId ?? undefined)
		);
		if (item) {
			item.quantity = quantity;
			saveCart(items);
		}
	}

	function clear() {
		items = [];
		saveCart(items);
	}

	function totalItems() {
		return items.reduce((sum, i) => sum + i.quantity, 0);
	}

	init();

	return {
		get items() { return items; },
		addItem,
		removeItem,
		updateQuantity,
		clear,
		totalItems,
	};
}

export const cart = createCartStore();