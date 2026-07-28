import { writable } from 'svelte/store';

export const searchQuery = writable('');
export const selectedCategory = writable<string | null>(null);
