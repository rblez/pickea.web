<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { cart } from '$lib/stores/cart.svelte';

	let totalItems = $derived(cart.totalItems());
</script>

<nav class="sticky top-0 z-50 bg-canvas/80 backdrop-blur-md border-b border-hairline">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<a href={base + '/'} class="flex items-center gap-2.5 text-ink no-underline">
				<img src={base + '/images/pickea-isotipo.png'} alt="Pickea" class="h-8 w-auto" />
				<span class="text-xl font-bold tracking-tight">Pickea</span>
			</a>

			<div class="flex items-center gap-5 sm:gap-6">
				<a
					href={base + '/'}
					class="flex items-center transition-colors duration-200 no-underline
						{$page.url.pathname === base + '/' ? 'text-ember' : 'text-body hover:text-ink'}"
				>
					<i class="ri-home-line text-xl sm:text-lg"></i>
					<span class="hidden sm:inline text-sm font-medium ml-1.5">Inicio</span>
				</a>
				<a
					href={base + '/cart'}
					class="relative flex items-center transition-colors duration-200 no-underline
						{$page.url.pathname === base + '/cart' ? 'text-ember' : 'text-body hover:text-ink'}"
				>
					<i class="ri-shopping-bag-line text-xl sm:text-lg"></i>
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
</nav>