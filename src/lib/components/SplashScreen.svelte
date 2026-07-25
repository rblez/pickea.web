<script lang="ts">
	let { ondone }: { ondone: () => void } = $props();

	const duration = Math.floor(Math.random() * 4000) + 4000;

	$effect(() => {
		const t = setTimeout(ondone, duration);
		return () => clearTimeout(t);
	});
</script>

<div class="fixed inset-0 z-[100] bg-black flex items-center justify-center">
	<img
		src={'/images/pickea-isotipo.png'}
		alt="Pickea"
		class="h-20 w-auto animate-pulse-icon"
	/>
</div>

<style>
	@keyframes pulse-icon {
		0%, 100% { opacity: 0.4; transform: scale(0.95); }
		50% { opacity: 1; transform: scale(1.05); }
	}
	.animate-pulse-icon {
		animation: pulse-icon 2s ease-in-out infinite;
	}
</style>