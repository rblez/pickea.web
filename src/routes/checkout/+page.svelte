<script lang="ts">
	import { base } from '$app/paths';
	import { cart } from '$lib/stores/cart.svelte';
	import products from '$lib/data/products';
	import { formatPrice } from '$lib/data/currencies';

	let name = $state('');
	let lastName = $state('');
	let phone = $state('');
	let acceptedTos = $state(false);
	let submitted = $state(false);
	let sending = $state(false);

	let cartProducts = $derived(
		cart.items
			.map((ci) => {
				const product = products.find((p) => p.id === ci.productId);
				return product ? { ...ci, product } : null;
			})
			.filter((x): x is NonNullable<typeof x> => x !== null)
	);

	let totalCUP = $derived(
		cartProducts.reduce((sum, cp) => sum + cp.product.priceUSD * cp.quantity, 0)
	);

	let totalFormatted = $derived(formatPrice(totalCUP, 'CUP'));

	let cartEmpty = $derived(cart.items.length === 0);

	function buildWhatsAppMessage(): string {
		const lines: string[] = ['*Nuevo Pedido — Pickea*', ''];
		let fullName = name;
		if (lastName) fullName += ` ${lastName}`;
		lines.push(`*Nombre:* ${fullName}`);
		lines.push(`*WhatsApp:* ${phone}`);
		lines.push(`*Total:* ${totalFormatted}`);
		lines.push('');
		lines.push('*Servicios:*');

		for (const cp of cartProducts) {
			const sub = formatPrice(cp.product.priceUSD * cp.quantity, 'CUP');
			lines.push(`- ${cp.product.name} x${cp.quantity} = ${sub}`);
		}

		lines.push('');
		lines.push('Gracias, espero su confirmación.');

		return encodeURIComponent(lines.join('\n'));
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (!name || !phone || !acceptedTos || sending) return;

		sending = true;
		const msg = buildWhatsAppMessage();

		setTimeout(() => {
			submitted = true;
			cart.clear();
			window.open(`https://wa.me/5363807214?text=${msg}`, '_blank');
		}, 1200);
	}
</script>

<svelte:head>
	<title>Checkout — Pickea</title>
</svelte:head>

<section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-section">
	<h1 class="text-3xl sm:text-4xl font-bold text-ink mb-10">Checkout</h1>

	{#if submitted}
		<div class="text-center py-16 bg-card border border-hairline rounded-card">
			<div class="w-16 h-16 bg-ember/10 rounded-full flex items-center justify-center mx-auto mb-4">
				<i class="ri-check-line text-3xl text-ember"></i>
			</div>
			<h2 class="text-2xl font-bold text-ink mb-2">¡Pedido enviado!</h2>
			<p class="text-body mb-6">Te hemos redirigido a WhatsApp para completar la compra.</p>
			<a
				href={base + '/'}
				class="inline-flex bg-ember text-white px-6 py-3 rounded-btn text-sm font-medium transition-all duration-200 hover:bg-ember-active no-underline"
			>
				Seguir comprando
			</a>
		</div>
	{:else if cartEmpty}
		<div class="text-center py-16 bg-card border border-hairline rounded-card">
			<p class="text-lg text-muted mb-6">Tu carrito está vacío</p>
			<a
				href={base + '/'}
				class="inline-flex bg-ember text-white px-6 py-3 rounded-btn text-sm font-medium transition-all no-underline"
			>
				Ver servicios
			</a>
		</div>
	{:else}
		<div class="max-w-2xl mx-auto space-y-6">
			<!-- Resumen del pedido -->
			<div class="bg-card border border-hairline rounded-card p-6 space-y-4">
				<h2 class="text-lg font-semibold text-ink">Tu pedido</h2>
				{#each cartProducts as cp}
					<div class="flex items-center justify-between text-sm">
						<span class="text-body">{cp.product.name} x{cp.quantity}</span>
						<span class="font-medium text-ink">{formatPrice(cp.product.priceUSD * cp.quantity, 'CUP')}</span>
					</div>
				{/each}
				<div class="pt-3 border-t border-hairline flex items-center justify-between">
					<span class="font-bold text-ink">Total</span>
					<span class="font-bold text-ember text-lg">{totalFormatted}</span>
				</div>
			</div>

			<!-- Formulario -->
			<form onsubmit={handleSubmit} class="bg-card border border-hairline rounded-card p-6 space-y-5">
				<h2 class="text-lg font-semibold text-ink">Tus datos</h2>

				<div>
					<label for="name" class="block text-sm font-medium text-body mb-1.5">Nombre</label>
					<input
						id="name"
						type="text"
						required
						bind:value={name}
						placeholder="Tu nombre"
						class="w-full px-3.5 py-2.5 bg-canvas border border-hairline rounded-btn text-sm text-ink placeholder:text-muted-soft focus:outline-none focus:border-ember transition-colors"
					/>
				</div>

				<div>
					<label for="lastName" class="block text-sm font-medium text-body mb-1.5">Apellidos <span class="text-muted-soft">(opcional)</span></label>
					<input
						id="lastName"
						type="text"
						bind:value={lastName}
						placeholder="Tus apellidos"
						class="w-full px-3.5 py-2.5 bg-canvas border border-hairline rounded-btn text-sm text-ink placeholder:text-muted-soft focus:outline-none focus:border-ember transition-colors"
					/>
				</div>

				<div>
					<label for="phone" class="block text-sm font-medium text-body mb-1.5">Número de WhatsApp</label>
					<input
						id="phone"
						type="tel"
						required
						bind:value={phone}
						placeholder="Ej: +53 12345678"
						class="w-full px-3.5 py-2.5 bg-canvas border border-hairline rounded-btn text-sm text-ink placeholder:text-muted-soft focus:outline-none focus:border-ember transition-colors"
					/>
				</div>

				<div class="flex items-start gap-3">
					<input
						id="tos"
						type="checkbox"
						bind:checked={acceptedTos}
						required
						class="mt-1 w-4 h-4 rounded border-hairline text-ember accent-ember cursor-pointer"
					/>
					<label for="tos" class="text-sm text-body cursor-pointer">
						He leído y acepto los
						<a href={base + '/tos'} target="_blank" class="text-ember hover:text-ember-active underline">Términos y Condiciones</a>
					</label>
				</div>

				<button
					type="submit"
					disabled={!acceptedTos || sending}
					class="w-full bg-ember text-white px-6 py-3 rounded-btn text-base font-medium transition-all duration-200 hover:bg-ember-active active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-ember disabled:active:scale-100 flex items-center justify-center gap-2"
				>
					{#if sending}
						<i class="ri-loader-4-line animate-spin"></i>
						Enviando...
					{:else}
						Enviar por WhatsApp — {totalFormatted}
					{/if}
				</button>
			</form>
		</div>
	{/if}
</section>