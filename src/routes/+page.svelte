<script lang="ts">
	import { categories } from '$lib/data/categories';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import SkeletonCard from '$lib/components/SkeletonCard.svelte';
	import products from '$lib/data/products';

	let searchQuery = $state('');
	let selectedCategory = $state<string | null>(null);
	let loaded = $state(false);
	let searchInput: HTMLInputElement;

	let filtered = $derived(
		products.filter((p) => {
			const matchesSearch =
				p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.description.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory = !selectedCategory || p.category === selectedCategory;
			return matchesSearch && matchesCategory;
		})
	);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === '/' && document.activeElement !== searchInput) {
			e.preventDefault();
			searchInput.focus();
		}
		if (e.key === 'Escape' && document.activeElement === searchInput) {
			searchInput.blur();
			searchQuery = '';
		}
	}

	$effect(() => {
		const t = setTimeout(() => loaded = true, 400);
		return () => clearTimeout(t);
	});
</script>

<svelte:head>
	<title>Pickea — Servicios digitales para Cuba</title>
	<meta name="description" content="Recargas, streaming, suscripciones, licencias y más. Compra y paga servicios digitales desde Cuba." />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-section">
	<div class="mb-8">
		<h1 class="text-3xl sm:text-4xl font-bold text-ink">Catálogo</h1>
		<p class="mt-2 text-body">{filtered.length} servicios disponibles</p>
	</div>

	<!-- Search -->
	<div class="mb-6">
		<div class="relative">
			<i class="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"></i>
			<input
				bind:this={searchInput}
				type="text"
				placeholder="Buscar servicios..."
				bind:value={searchQuery}
				class="w-full pl-10 pr-20 py-2.5 bg-card border border-hairline rounded-btn text-sm text-ink placeholder:text-muted-soft focus:outline-none focus:border-ember transition-colors"
			/>
			<kbd class="hidden sm:inline-flex absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-muted-soft border border-hairline rounded">/</kbd>
		</div>
	</div>

	<!-- Category pills -->
	<div class="flex flex-wrap gap-2 mb-8">
		<button
			onclick={() => selectedCategory = null}
			class="px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 cursor-pointer
				{!selectedCategory
					? 'bg-ember text-white border-ember shadow-lg shadow-ember/20'
					: 'bg-card text-body border-hairline hover:border-ember/50 hover:text-ember'}"
		>
			Todos
		</button>
		{#each categories as cat}
			<button
				onclick={() => selectedCategory = cat.slug}
				class="px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 cursor-pointer
					{selectedCategory === cat.slug
						? 'bg-ember text-white border-ember shadow-lg shadow-ember/20'
						: 'bg-card text-body border-hairline hover:border-ember/50 hover:text-ember'}"
			>
				{cat.name}
			</button>
		{/each}
	</div>

	{#if !loaded}
		<SkeletonCard count={6} />
	{:else if filtered.length === 0}
		<div class="text-center py-20">
			<i class="ri-search-line text-5xl text-muted-soft mb-4 block"></i>
			<p class="text-muted text-lg">No se encontraron servicios</p>
			<button
				onclick={() => { searchQuery = ''; selectedCategory = null; }}
				class="mt-4 text-ember text-sm font-medium hover:text-ember-active transition-colors cursor-pointer"
			>
				Limpiar filtros
			</button>
		</div>
	{:else}
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
			{#each filtered as product}
				<ProductCard {product} />
			{/each}
		</div>
	{/if}
</section>