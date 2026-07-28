<script lang="ts">
	import { cart } from '$lib/stores/cart.svelte';
	import { formatPrice } from '$lib/data/currencies';
	import products from '$lib/data/products';
	import { goto } from '$app/navigation';

	function resolveItem(ci: { productId: string; variantId?: string; quantity: number }) {
		const product = products.find((p) => p.id === ci.productId);
		if (!product) return null;
		const variant = ci.variantId ? product.variants?.find((v) => v.id === ci.variantId) : null;
		const price = variant ? variant.price : product.priceUSD;
		const label = variant ? variant.label : null;
		return { ...ci, product, variant, price, label };
	}

	let cartProducts = $derived(
		cart.items.map(resolveItem).filter((x): x is NonNullable<typeof x> => x !== null)
	);

	let totalCUP = $derived(
		cartProducts.reduce((sum, cp) => sum + cp.price * cp.quantity, 0)
	);

	let totalFormatted = $derived(formatPrice(totalCUP, 'CUP'));

	let cartEmpty = $derived(cart.items.length === 0);

	$effect(() => {
		if (cartEmpty) {
			goto('/');
		}
	});
</script>

<svelte:head>
	<title>Pickea | Carrito</title>
</svelte:head>

<section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-section">
	<h1 class="text-3xl sm:text-4xl font-bold text-ink mb-10">Carrito</h1>

	{#if cartEmpty}
		<div class="text-center py-16 bg-card border border-hairline rounded-card">
			<p class="text-lg text-muted mb-6">Tu carrito está vacío</p>
			<a
				href={'/'}
				class="inline-flex bg-ember text-white px-6 py-3 rounded-btn text-sm font-medium transition-all duration-200 hover:bg-ember-active no-underline"
			>
				Ver servicios
			</a>
		</div>
	{:else}
		<div class="space-y-4 mb-8">
			{#each cartProducts as cp}
				<div class="flex items-center gap-4 bg-card border border-hairline rounded-card p-4">
					{#if cp.product.image}
						<img
							src={'/images/' + cp.product.image}
							alt={cp.product.name}
							class="w-20 h-20 object-cover rounded-lg bg-canvas flex-shrink-0"
						/>
					{:else}
						<div class="w-20 h-20 rounded-lg bg-canvas flex items-center justify-center flex-shrink-0">
							<i class="ri-image-line text-2xl text-muted-soft"></i>
						</div>
					{/if}
					<div class="flex-1 min-w-0">
						<h3 class="font-semibold text-ink truncate">
							{cp.product.name}
							{#if cp.label}
								<span class="text-xs text-ember font-normal"> — {cp.label}</span>
							{/if}
						</h3>
						<p class="text-sm text-muted mt-0.5">{formatPrice(cp.price, 'CUP')}</p>
					</div>
					<div class="flex items-center gap-2">
						<button
							onclick={() => cart.updateQuantity(cp.productId, cp.quantity - 1, cp.variantId)}
							class="w-8 h-8 flex items-center justify-center border border-hairline rounded-md text-ink hover:bg-bone transition-colors cursor-pointer text-lg"
						>-</button>
						<span class="w-8 text-center font-medium text-ink">{cp.quantity}</span>
						<button
							onclick={() => cart.updateQuantity(cp.productId, cp.quantity + 1, cp.variantId)}
							class="w-8 h-8 flex items-center justify-center border border-hairline rounded-md text-ink hover:bg-bone transition-colors cursor-pointer text-lg"
						>+</button>
					</div>
					<button
						onclick={() => cart.removeItem(cp.productId, cp.variantId)}
						class="p-2 text-muted-soft hover:text-error transition-colors cursor-pointer"
						aria-label="Eliminar"
					>
						<i class="ri-delete-bin-line text-lg"></i>
					</button>
				</div>
			{/each}
		</div>

		<div class="bg-card border border-hairline rounded-card p-6">
			<div class="flex items-center justify-between">
				<span class="text-lg font-bold text-ink">Total</span>
				<span class="text-xl font-bold text-ember">{totalFormatted}</span>
			</div>

			<a
				href={'/checkout'}
				class="mt-6 w-full flex items-center justify-center gap-2 bg-ember text-white px-6 py-3 rounded-btn text-base font-medium transition-all duration-200 hover:bg-ember-active active:scale-[0.98] no-underline"
			>
				Proceder
			</a>
		</div>
	{/if}
</section>