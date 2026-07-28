<script lang="ts">
	import type { Product } from '$lib/types';
	import { formatPrice } from '$lib/data/currencies';
	import { goto } from '$app/navigation';

	let { product }: { product: Product } = $props();

	let imgError = $state(false);

	let isAgotado = $derived(
		product.agotado ||
		(product.variants && product.variants.length > 0 && product.variants.every(v => v.agotado)) ||
		false
	);

	let minPrice = $derived(
		product.variants
			? Math.min(...product.variants.filter(v => !v.agotado).map(v => v.price))
			: product.priceUSD
	);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			goto('/p/' + product.id);
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onclick={() => goto('/p/' + product.id)}
	onkeydown={handleKeydown}
	role="button"
	tabindex="0"
	class="bg-card border border-hairline rounded-card overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-ink/5 hover:-translate-y-0.5 cursor-pointer"
>
	<div class="aspect-[4/3] bg-canvas overflow-hidden">
		{#if !imgError}
			<img
				src={'/images/' + product.image}
				alt={product.name}
				class="w-full h-full object-cover"
				loading="lazy"
				onerror={() => imgError = true}
			/>
		{/if}
	</div>
	<div class="p-3 sm:p-5 flex flex-col gap-2 sm:gap-3">
		<h3 class="text-sm sm:text-lg font-semibold text-ink leading-tight">{product.name}</h3>
		<p class="text-xs sm:text-sm text-body leading-relaxed line-clamp-2">{product.description}</p>

		<p class="text-base sm:text-xl font-bold text-ember">
			{#if isAgotado}
				<span class="text-muted-soft">Agotado</span>
			{:else if product.variants && product.variants.length > 0}
				Desde {formatPrice(minPrice, 'CUP')}
			{:else}
				{formatPrice(product.priceUSD, 'CUP')}
			{/if}
		</p>

		<button
			onclick={(e) => { e.stopPropagation(); goto('/p/' + product.id); }}
			disabled={isAgotado}
			class="w-full mt-2 px-4 py-2.5 rounded-btn text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2
				{isAgotado
					? 'bg-bone text-muted-soft cursor-not-allowed'
					: 'bg-ember text-white hover:bg-ember-active active:scale-[0.98]'}"
		>
			{isAgotado ? 'Agotado' : 'Ver opciones'}
		</button>
	</div>
</div>