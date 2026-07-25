<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import products from '$lib/data/products';
	import ProductModal from '$lib/components/ProductModal.svelte';

	let product = $derived(products.find((p) => p.id === Number($page.params.id)));

	$effect(() => {
		if (!product) {
			goto('/');
		}
	});
</script>

{#if product}
	<ProductModal {product} onclose={() => goto('/')} />
{/if}