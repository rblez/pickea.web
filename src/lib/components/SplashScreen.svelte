<script lang="ts">
	let { ondone }: { ondone: () => void } = $props();

	const duration = Math.floor(Math.random() * 4000) + 4000;

	$effect(() => {
		const t = setTimeout(ondone, duration);
		return () => clearTimeout(t);
	});
</script>

<div class="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-6">
	<img
		src={'/images/pickea-isotipo.png'}
		alt="Pickea"
		class="h-20 w-auto animate-pulse-all"
	/>
	<div class="flex items-center gap-1.5 animate-pulse-all">
		<span class="w-2 h-2 bg-ember rounded-full"></span>
		<span class="w-2 h-2 bg-ember rounded-full"></span>
		<span class="w-2 h-2 bg-ember rounded-full"></span>
	</div>
</div>

<style>
	@keyframes pulse-all {
		0%, 100% { opacity: 0.4; transform: scale(0.95); }
		50% { opacity: 1; transform: scale(1.05); }
	}
	.animate-pulse-all {
		animation: pulse-all 2s ease-in-out infinite;
	}
</style>