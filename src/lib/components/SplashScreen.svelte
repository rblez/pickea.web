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
		class="h-20 w-auto animate-pulse-icon"
	/>
	<div class="flex items-center gap-1.5">
		<span class="w-2 h-2 bg-ember rounded-full animate-dot-1"></span>
		<span class="w-2 h-2 bg-ember rounded-full animate-dot-2"></span>
		<span class="w-2 h-2 bg-ember rounded-full animate-dot-3"></span>
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
	@keyframes dot-bounce {
		0%, 80%, 100% { opacity: 0.4; transform: scale(0.85); }
		40% { opacity: 1; transform: scale(1.15); }
	}
	.animate-dot-1 { animation: dot-bounce 1.2s ease-in-out infinite; }
	.animate-dot-2 { animation: dot-bounce 1.2s ease-in-out 0.15s infinite; }
	.animate-dot-3 { animation: dot-bounce 1.2s ease-in-out 0.3s infinite; }
</style>