<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import OfflineBanner from '$lib/components/OfflineBanner.svelte';
	import { getModalOpen } from '$lib/stores/modal.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Pickea | Servicios digitales para Cuba</title>
</svelte:head>

<Navbar />
<ScrollToTop />
<OfflineBanner />
<main class="min-h-[calc(100vh-4rem)]">
	{@render children()}
</main>
<Footer />