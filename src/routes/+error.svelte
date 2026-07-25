<script lang="ts">
	import { page } from '$app/stores';

	let status = $derived($page.status);
	let message = $derived(
		status === 404 ? 'Página no encontrada' : 'Error interno del servidor'
	);
</script>

<svelte:head>
	<title>Pickea | Error {status}</title>
</svelte:head>

<div class="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
	<img
		src={'/images/pickea-isotipo.png'}
		alt="Pickea"
		class="h-16 w-auto mb-8 opacity-30"
	/>

	<h1 class="text-7xl sm:text-8xl font-bold text-ink/10 tracking-tight">
		{status}
	</h1>

	<p class="mt-4 text-xl text-body font-medium">
		{message}
	</p>

	<p class="mt-2 text-sm text-muted max-w-md">
		{#if status === 404}
			La página que buscas no existe o fue movida.
		{:else}
			Algo salió mal. Intenta de nuevo más tarde.
		{/if}
	</p>

	<div class="mt-8 flex gap-4">
		<a
			href={'/'}
			class="inline-flex items-center gap-2 bg-ember text-white px-6 py-3 rounded-btn text-sm font-medium transition-all duration-200 hover:bg-ember-active no-underline"
		>
			Ir al inicio
		</a>
		<a
			href={'/'}
			class="inline-flex items-center gap-2 border border-hairline text-ink px-6 py-3 rounded-btn text-sm font-medium transition-all duration-200 hover:bg-bone no-underline"
		>
			Ver productos
		</a>
	</div>
</div>
