<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import SplashScreen from '$lib/components/SplashScreen.svelte';
	import OfflineBanner from '$lib/components/OfflineBanner.svelte';
	import { getModalOpen } from '$lib/stores/modal.svelte';

	let { children } = $props();
	let splashDone = $state(false);

	$effect(() => {
		if (!splashDone) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => { document.body.style.overflow = ''; };
	});
</script>

<svelte:head>
	<title>Pickea | Servicios digitales para Cuba</title>
</svelte:head>

{#if !splashDone}
	<SplashScreen ondone={() => splashDone = true} />
{/if}

<Navbar />
<ScrollToTop />
<OfflineBanner />
<main class="min-h-[calc(100vh-4rem)]">
	{@render children()}
</main>
<Footer />