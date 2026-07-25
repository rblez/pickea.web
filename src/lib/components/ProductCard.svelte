<script lang="ts">
	import type { Product } from '$lib/types';
	import { formatPrice } from '$lib/data/currencies';
	import { base } from '$app/paths';
	import ProductModal from './ProductModal.svelte';

	let { product }: { product: Product } = $props();

	let showModal = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			showModal = true;
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onclick={() => showModal = true}
	onkeydown={handleKeydown}
	role="button"
	tabindex="0"
	class="bg-card border border-hairline rounded-card overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-ink/5 hover:-translate-y-0.5 cursor-pointer"
>
	<div class="aspect-[4/3] bg-bone overflow-hidden">
		<img
			src={base + '/images/' + product.image}
			alt={product.name}
			class="w-full h-full object-cover"
			loading="lazy"
		/>
	</div>
	<div class="p-3 sm:p-5 flex flex-col gap-2 sm:gap-3">
		<h3 class="text-sm sm:text-lg font-semibold text-ink leading-tight">{product.name}</h3>
		<p class="text-xs sm:text-sm text-body leading-relaxed line-clamp-2">{product.description}</p>

		<p class="text-base sm:text-xl font-bold text-ember">{formatPrice(product.priceUSD, 'CUP')}</p>

		<button
			onclick={(e) => { e.stopPropagation(); showModal = true; }}
			class="w-full mt-2 bg-ember text-white px-4 py-2.5 rounded-btn text-sm font-medium transition-all duration-200 hover:bg-ember-active active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
		>
			Ver opciones
		</button>
	</div>
</div>

{#if showModal}
	<ProductModal {product} onclose={() => showModal = false} />
{/if}