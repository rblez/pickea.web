class FilterState {
	searchQuery = $state('');
	selectedCategory = $state<string | null>(null);
}
export const filters = new FilterState();
