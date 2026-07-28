<script lang="ts">
	import { page } from '$app/stores';
	import { cart } from '$lib/stores/cart.svelte';
	import { searchQuery } from '$lib/stores/filters.svelte';

	let totalItems = $derived(cart.totalItems());
	let searchInput: HTMLInputElement | undefined = $state();

	function handleSearch(e: Event) {
		$searchQuery = (e.target as HTMLInputElement).value;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && document.activeElement === searchInput) {
			searchInput.blur();
			$searchQuery = '';
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<nav class="sticky top-0 z-50 bg-canvas/80 backdrop-blur-md border-b border-hairline">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<a href={'/'} class="flex items-center gap-2.5 text-ink no-underline shrink-0">
				<img src={'/images/pickea-isotipo.png'} alt="Pickea" class="h-8 w-auto" />
				<span class="text-xl font-bold tracking-tight">Pickea</span>
			</a>

			{#if $page.url.pathname === '/'}
				<div class="hidden md:block flex-1 max-w-xs mx-6">
					<div class="relative">
						<i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm"></i>
						<input
							bind:this={searchInput}
							type="text"
							placeholder="Buscar..."
							value={$searchQuery}
							oninput={handleSearch}
							class="w-full pl-9 pr-3 py-1.5 bg-card border border-hairline rounded-full text-sm text-ink placeholder:text-muted-soft focus:outline-none focus:border-ember transition-colors"
						/>
					</div>
				</div>
			{/if}

			<div class="flex items-center gap-5 sm:gap-6">
				<a
					href={'/'}
					class="flex items-center transition-colors duration-200 no-underline
						{$page.url.pathname === '/' ? 'text-ember' : 'text-body hover:text-ink'}"
				>
					<i class="{$page.url.pathname === '/' ? 'ri-home-4-fill' : 'ri-home-4-line'} text-xl sm:text-lg"></i>
					<span class="hidden sm:inline text-sm font-medium ml-1.5">Inicio</span>
				</a>
				<a
					href={'/cart'}
					class="relative flex items-center transition-colors duration-200 no-underline
						{$page.url.pathname === '/cart' ? 'text-ember' : 'text-body hover:text-ink'}"
				>
					<i class="{$page.url.pathname === '/cart' ? 'ri-shopping-bag-fill' : 'ri-shopping-bag-line'} text-xl sm:text-lg"></i>
					<span class="hidden sm:inline text-sm font-medium ml-1.5">Carrito</span>
					{#if totalItems > 0}
						<span class="absolute -top-2 -right-3 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold bg-ember text-white rounded-full">
							{totalItems}
						</span>
					{/if}
				</a>
			</div>
		</div>
	</div>

	{#if $page.url.pathname === '/'}
		<div class="md:hidden border-t border-hairline px-4 py-2.5">
			<div class="relative">
				<i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm"></i>
				<input
					type="text"
					placeholder="Buscar servicios..."
					value={$searchQuery}
					oninput={handleSearch}
					class="w-full pl-9 pr-3 py-2 bg-card border border-hairline rounded-full text-sm text-ink placeholder:text-muted-soft focus:outline-none focus:border-ember transition-colors"
				/>
			</div>
		</div>
	{/if}
</nav>
