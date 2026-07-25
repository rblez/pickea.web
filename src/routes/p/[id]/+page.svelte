<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import products from '$lib/data/products';
	import ProductModal from '$lib/components/ProductModal.svelte';

	let product = $derived(products.find((p) => p.id === $page.params.id));

	$effect(() => {
		if (!product) {
			goto('/');
		}
	});
</script>

<svelte:head>
	<title>Pickea | {product?.name || 'Producto'}</title>
	<meta property="og:title" content="Pickea | {product?.name || 'Producto'}" />
	<meta property="og:url" content="https://pickea.rblez.com/p/{product?.id}" />
	<meta property="og:description" content={product?.description || ''} />
</svelte:head>

{#if product}
	<ProductModal {product} onclose={() => goto('/')} />
{/if}