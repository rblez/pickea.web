<script lang="ts">
	const socials = [
		{ name: 'Telegram', icon: 'https://cdn.simpleicons.org/Telegram/FFFFFF', url: 'https://t.me/pickeaofc?utm_source=pickea&utm_medium=footer' },
		{ name: 'Instagram', icon: 'https://cdn.simpleicons.org/Instagram/FFFFFF', url: 'https://instagram.com/pickea_?utm_source=pickea&utm_medium=footer' },
		{ name: 'WhatsApp', icon: 'https://cdn.simpleicons.org/WhatsApp/FFFFFF', url: 'https://wa.me/5363807214?utm_source=pickea&utm_medium=footer' },
	] as const;

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-hairline bg-canvas/80 backdrop-blur-md">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center gap-4">
		<div class="flex items-center gap-4">
			{#each socials as social}
				<a
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					class="w-10 h-10 flex items-center justify-center rounded-full border border-hairline hover:border-ember/50 transition-colors no-underline"
					aria-label={social.name}
				>
					<img src={social.icon} alt={social.name} class="w-5 h-5" />
				</a>
			{/each}
		</div>

		<div class="flex items-center gap-3">
			<p class="text-xs text-muted-soft">Métodos de pago:</p>
			<div class="flex items-center gap-2">
				<div class="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-hairline">
					<img src="/images/enzona.png" alt="Enzona" class="w-9 h-9 object-contain" />
				</div>
				<div class="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-hairline">
					<img src="/images/transfermovil.png" alt="Transfermóvil" class="w-9 h-9 object-contain" />
				</div>
			</div>
		</div>

		<p class="text-xs text-muted-soft">&copy; {year} Pickea v1.0.01(beta). Todos los derechos reservados.</p>
	</div>
</footer>