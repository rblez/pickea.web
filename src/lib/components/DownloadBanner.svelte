<script lang="ts">
	let visible = $state(false);
	let dismissed = $state(false);
	let isNative = $state(false);

	$effect(() => {
		isNative = typeof window !== 'undefined' && typeof (window as any).Capacitor !== 'undefined';
	});

	$effect(() => {
		if (!dismissed && !isNative) {
			const t = setTimeout(() => visible = true, 8000);
			return () => clearTimeout(t);
		}
	});

	function dismiss() {
		dismissed = true;
		visible = false;
	}
</script>

{#if visible}
	<div
		class="fixed bottom-24 right-4 z-50 max-w-xs bg-card border border-hairline rounded-card p-4 shadow-2xl animate-slide-in"
		role="alert"
	>
		<button
			onclick={dismiss}
			class="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-muted-soft hover:text-ink transition-colors cursor-pointer"
			aria-label="Cerrar"
		>
			<i class="ri-close-line text-sm"></i>
		</button>

		<div class="flex items-center gap-3 mb-3">
			<div class="w-10 h-10 rounded-xl bg-canvas flex items-center justify-center overflow-hidden flex-shrink-0">
				<img src="/images/pickea-isotipo.png" alt="Pickea" class="w-6 h-6" />
			</div>
			<div>
				<p class="text-sm font-semibold text-ink">Pickea para Android</p>
				<p class="text-xs text-muted">Descarga la app</p>
			</div>
		</div>

		<p class="text-xs text-muted leading-relaxed mb-3">
			Si Play Protect bloquea la instalación, presiona <span class="text-ink font-medium">Más detalles</span> → <span class="text-ink font-medium">Instalar de todos modos</span>.
		</p>

		<a
			href="/download/pickea.apk"
			onclick={dismiss}
			class="flex items-center justify-center gap-1.5 w-full bg-ember text-white px-3 py-2 rounded-btn text-xs font-medium transition-all duration-200 hover:bg-ember-active no-underline"
		>
			<i class="ri-download-line text-sm"></i>
			Descargar APK
		</a>
	</div>
{/if}

<style>
	@keyframes slide-in-right {
		from { transform: translateX(calc(100% + 1rem)); opacity: 0; }
		to { transform: translateX(0); opacity: 1; }
	}
	:global(.animate-slide-in) {
		animation: slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}
</style>
