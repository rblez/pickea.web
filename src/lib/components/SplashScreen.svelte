<script lang="ts">
	let { ondone }: { ondone: () => void } = $props();

	const duration = Math.floor(Math.random() * 4000) + 4000;
	let progress = $state(0);

	$effect(() => {
		const t = setTimeout(ondone, duration);
		const start = Date.now();

		function tick() {
			const elapsed = Date.now() - start;
			progress = Math.min((elapsed / duration) * 100, 100);
			if (elapsed < duration) {
				requestAnimationFrame(tick);
			}
		}

		requestAnimationFrame(tick);
		return () => clearTimeout(t);
	});
</script>

<div class="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-8">
	<img
		src={'/images/pickea-isotipo.png'}
		alt="Pickea"
		class="h-20 w-auto animate-pulse-icon"
	/>
	<div class="w-40 h-1.5 bg-white/10 rounded-full overflow-hidden">
		<div
			class="h-full bg-ember rounded-full"
			style="width: {progress}%"
		></div>
	</div>
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