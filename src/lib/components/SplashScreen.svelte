<script lang="ts">
	let { ondone }: { ondone: () => void } = $props();

	const duration = Math.floor(Math.random() * 4000) + 4000;
	let phase = $state<'pulse' | 'exit'>('pulse');
	let progress = $state(0);

	$effect(() => {
		const exitTime = duration - 1000;
		const t1 = setTimeout(() => phase = 'exit', exitTime);
		const t2 = setTimeout(ondone, duration);

		const start = Date.now();
		const tick = () => {
			const elapsed = Date.now() - start;
			progress = Math.min((elapsed / duration) * 100, 100);
			if (elapsed < duration) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);

		return () => { clearTimeout(t1); clearTimeout(t2); };
	});
</script>

<div class="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-8">
	<img
		src={'/images/pickea-isotipo.png'}
		alt="Pickea"
		class="h-20 w-auto transition-all duration-700 ease-in-out
			{phase === 'pulse' ? 'animate-pulse-icon opacity-100' : 'opacity-0 translate-y-8 scale-90'}"
	/>
	<div class="w-40 transition-all duration-500 ease-in-out
		{phase === 'pulse' ? 'opacity-100' : 'opacity-0 scale-x-75'}">
		<div class="h-1 bg-hairline rounded-full overflow-hidden">
			<div
				class="h-full bg-ember rounded-full transition-all duration-100 ease-linear"
				style="width: {progress}%"
			></div>
		</div>
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