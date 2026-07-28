<script lang="ts">
	import { page } from '$app/stores';
	import { categories } from '$lib/data/categories';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import SkeletonCard from '$lib/components/SkeletonCard.svelte';
	import products from '$lib/data/products';
	import { searchQuery, selectedCategory } from '$lib/stores/filters.svelte';

	let loaded = $state(false);

	let filtered = $derived(
		products.filter((p) => {
			const q = $searchQuery.toLowerCase();
			const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
			const matchesCategory = !$selectedCategory || p.category === $selectedCategory;
			return matchesSearch && matchesCategory;
		})
	);

	let groupedByCategory = $derived(
		categories
			.map((cat) => ({
				...cat,
				products: filtered.filter((p) => p.category === cat.slug),
			}))
			.filter((g) => g.products.length > 0)
	);

	function setCategory(slug: string | null) {
		$selectedCategory = slug;
		const url = new URL(window.location.href);
		if (slug) {
			url.searchParams.set('category', slug);
		} else {
			url.searchParams.delete('category');
		}
		history.replaceState(history.state, '', url.pathname + url.search);
	}

	function clearFilters() {
		$searchQuery = '';
		$selectedCategory = null;
		history.replaceState(history.state, '', '/');
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
			e.preventDefault();
			document.querySelector<HTMLInputElement>('nav input')?.focus();
		}
	}

	$effect(() => {
		const t = setTimeout(() => loaded = true, 400);
		return () => clearTimeout(t);
	});
</script>

<svelte:head>
	<title>Pickea | Catálogo</title>
	<meta name="description" content="Recargas, streaming, suscripciones, licencias y más. Compra y paga servicios digitales desde Cuba." />
	<link rel="canonical" href="https://pickea.rblez.com{$page.url.pathname}" />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-section">

	<a href="/p/paypal-argentina" class="block mb-8 rounded-card overflow-hidden hover:opacity-90 transition-opacity">
		<img
			src="/images/banner-paypal.webp"
			alt="PayPal Argentina — Recarga tu cuenta desde Cuba"
			class="w-full h-auto"
		/>
	</a>

	<!-- Category pills -->
	<div class="flex flex-wrap gap-2 mb-8">
		<button
			onclick={() => setCategory(null)}
			class="px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 cursor-pointer
				{!$selectedCategory
					? 'bg-ember text-white border-ember shadow-lg shadow-ember/20'
					: 'bg-card text-body border-hairline hover:border-ember/50 hover:text-ember'}"
		>
			Todos
		</button>
		{#each categories as cat}
			<button
				onclick={() => setCategory(cat.slug)}
				class="px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 cursor-pointer
					{$selectedCategory === cat.slug
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
				onclick={clearFilters}
				class="mt-4 text-ember text-sm font-medium hover:text-ember-active transition-colors cursor-pointer"
			>
				Limpiar filtros
			</button>
		</div>
	{:else if $selectedCategory || $searchQuery}
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
			{#each filtered as product}
				<ProductCard {product} />
			{/each}
		</div>
	{:else}
		{#each groupedByCategory as group}
			<div class="mb-10">
				<h2 class="text-xl sm:text-2xl font-bold text-ink mb-4 flex items-center gap-2">
					{group.name}
					<span class="text-sm font-normal text-muted-soft">({group.products.length})</span>
				</h2>
				<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
					{#each group.products as product}
						<ProductCard {product} />
					{/each}
				</div>
			</div>
		{/each}
	{/if}
</section>
