<script lang="ts">
	import type { Product } from '$lib/types';
	import { formatPrice } from '$lib/data/currencies';
	import { cart } from '$lib/stores/cart.svelte';
	import { goto } from '$app/navigation';
	import { setModalOpen } from '$lib/stores/modal.svelte';

	let { product, onclose }: { product: Product; onclose: () => void } = $props();

	let imgSrc = $derived('/images/' + product.image);
	let showShare = $state(false);
	let imgError = $state(false);
	let selectedVariant = $state(product.variants?.[0] ?? null);

	let currentPrice = $derived(selectedVariant ? selectedVariant.price : product.priceUSD);
	let isAgotado = $derived(product.agotado || selectedVariant?.agotado || false);

	$effect(() => {
		setModalOpen(true);
		document.body.style.overflow = 'hidden';
		return () => {
			setModalOpen(false);
			document.body.style.overflow = '';
		};
	});

	function buyNow() {
		cart.addItem(product.id, selectedVariant?.id);
		onclose();
		goto('/checkout');
	}

	const shareUrl = $derived(`https://pickea.rblez.com/p/${product.id}?utm_source=share&utm_medium=social&utm_campaign=product`);
	const shareText = $derived(`Mira este servicio: ${product.name}${selectedVariant ? ' — ' + selectedVariant.label : ''} — ${formatPrice(currentPrice, 'CUP')}`);

	function shareWhatsApp() {
		window.open(`https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`, '_blank');
		showShare = false;
	}

	function shareTelegram() {
		window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
		showShare = false;
	}

	function shareFacebook() {
		window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
		showShare = false;
	}

	function shareX() {
		window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
		showShare = false;
	}

	function copyLink() {
		navigator.clipboard.writeText(shareUrl);
		showShare = false;
	}
</script>

<!-- backdrop -->
<button
	onclick={onclose}
	class="fixed inset-0 z-40 bg-black/60 cursor-default pointer-events-auto"
	aria-label="Cerrar"
></button>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- modal -->
<div
	class="fixed inset-0 z-50 flex items-center justify-center pointer-events-none
		p-0 sm:p-4"
	role="dialog"
	aria-modal="true"
	onkeydown={(e) => e.key === 'Escape' && onclose()}
>
	<div
		role="presentation"
		class="bg-card shadow-2xl pointer-events-auto flex flex-col
			w-full h-full sm:h-auto sm:max-w-lg sm:rounded-card sm:my-auto"
		onclick={(e) => e.stopPropagation()}
	>
		<div class="relative flex-shrink-0">
			<div class="aspect-[16/9] sm:aspect-[4/3] bg-canvas overflow-hidden sm:rounded-t-card">
				{#if !imgError}
					<img src={imgSrc} alt={product.name} class="w-full h-full object-cover" onerror={() => imgError = true} />
				{/if}
			</div>
			<button
				onclick={onclose}
				class="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer"
				aria-label="Cerrar"
			>
				<i class="ri-close-line text-xl"></i>
			</button>
		</div>

		<div class="flex-1 min-h-0 flex flex-col justify-center p-5 sm:p-6 gap-4 sm:gap-5 overflow-y-auto">
			<div>
				<h2 class="text-xl sm:text-2xl font-bold text-ink">{product.name}</h2>
				<p class="text-sm text-muted mt-1">{product.category}</p>
			</div>

			<p class="text-sm sm:text-base text-body leading-relaxed">{product.description}</p>

			<!-- Variant selector -->
			{#if product.variants && product.variants.length > 0}
				<div>
					<p class="text-xs sm:text-sm text-muted mb-2">Elige una opción:</p>
					<div class="flex flex-wrap gap-2">
						{#each product.variants as variant}
							<button
								onclick={() => selectedVariant = variant}
								disabled={variant.agotado}
								class="px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200
									{variant.agotado
										? 'border-hairline text-muted-soft cursor-not-allowed line-through'
										: selectedVariant?.id === variant.id
											? 'bg-ember text-white border-ember shadow-lg shadow-ember/20 cursor-pointer'
											: 'bg-card text-body border-hairline hover:border-ember/50 hover:text-ember cursor-pointer'}"
							>
								{variant.label}
							</button>
						{/each}
					</div>
				</div>
			{/if}

			{#if isAgotado}
				<div class="bg-bone rounded-btn p-3 sm:p-4 text-center">
					<p class="text-sm font-medium text-muted-soft">Producto agotado</p>
				</div>
			{:else}
				<div class="bg-bone rounded-btn p-3 sm:p-4">
					<p class="text-xs sm:text-sm text-muted mb-0.5">Precio</p>
					<p class="text-xl sm:text-2xl font-bold text-ember">{formatPrice(currentPrice, 'CUP')}</p>
				</div>
			{/if}

			<div class="mt-auto space-y-3">
				{#if isAgotado}
					<button
						disabled
						class="w-full bg-bone text-muted-soft px-5 py-3 rounded-btn text-sm sm:text-base font-medium cursor-not-allowed"
					>
						Agotado
					</button>
				{:else}
					<div class="flex gap-3">
						<button
							onclick={buyNow}
							class="flex-1 bg-ember text-white px-5 py-3 rounded-btn text-sm sm:text-base font-medium transition-all duration-200 hover:bg-ember-active active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
						>
							Comprar
						</button>
						<button
							onclick={() => { cart.addItem(product.id, selectedVariant?.id); }}
							class="flex-1 px-5 py-3 border border-hairline text-body rounded-btn text-sm sm:text-base font-medium transition-all duration-200 hover:bg-bone cursor-pointer flex items-center justify-center gap-2"
						>
							<i class="ri-add-line"></i>
							Añadir al carrito
						</button>
					</div>
				{/if}

				<!-- Share -->
				<div class="relative">
					<button
						onclick={() => showShare = !showShare}
						class="w-full flex items-center justify-center gap-2 px-5 py-2.5 border border-hairline text-body rounded-btn text-sm font-medium transition-all duration-200 hover:bg-bone cursor-pointer"
					>
						<i class="ri-share-line"></i>
						Compartir
					</button>

					{#if showShare}
						<div class="absolute bottom-full left-0 right-0 mb-2 bg-card border border-hairline rounded-card p-3 space-y-1 shadow-xl">
							<button onclick={shareWhatsApp} class="w-full flex items-center gap-3 px-3 py-2 text-sm text-body hover:bg-bone rounded-btn transition-colors cursor-pointer text-left">
								<img src="https://cdn.simpleicons.org/WhatsApp/FFFFFF" class="w-5 h-5" alt="WhatsApp" />
								WhatsApp
							</button>
							<button onclick={shareTelegram} class="w-full flex items-center gap-3 px-3 py-2 text-sm text-body hover:bg-bone rounded-btn transition-colors cursor-pointer text-left">
								<img src="https://cdn.simpleicons.org/Telegram/FFFFFF" class="w-5 h-5" alt="Telegram" />
								Telegram
							</button>
							<button onclick={shareFacebook} class="w-full flex items-center gap-3 px-3 py-2 text-sm text-body hover:bg-bone rounded-btn transition-colors cursor-pointer text-left">
								<img src="https://cdn.simpleicons.org/Facebook/FFFFFF" class="w-5 h-5" alt="Facebook" />
								Facebook
							</button>
							<button onclick={shareX} class="w-full flex items-center gap-3 px-3 py-2 text-sm text-body hover:bg-bone rounded-btn transition-colors cursor-pointer text-left">
								<img src="https://cdn.simpleicons.org/X/FFFFFF" class="w-5 h-5" alt="X" />
								X
							</button>
							<button onclick={copyLink} class="w-full flex items-center gap-3 px-3 py-2 text-sm text-body hover:bg-bone rounded-btn transition-colors cursor-pointer text-left">
								<i class="ri-link text-lg"></i>
								Copiar enlace
							</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>