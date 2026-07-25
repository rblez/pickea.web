<script lang="ts">
	const socials = [
		{ name: 'Facebook', icon: 'https://cdn.simpleicons.org/Facebook/FFFFFF', url: 'https://facebook.com/pickea' },
		{ name: 'X', icon: 'https://cdn.simpleicons.org/X/FFFFFF', url: 'https://x.com/pickea' },
		{ name: 'Instagram', icon: 'https://cdn.simpleicons.org/Instagram/FFFFFF', url: 'https://instagram.com/pickea' },
		{ name: 'Telegram', icon: 'https://cdn.simpleicons.org/Telegram/FFFFFF', url: 'https://t.me/pickea' },
		{ name: 'WhatsApp', icon: 'https://cdn.simpleicons.org/WhatsApp/FFFFFF', url: 'https://wa.me/5363807214' },
	] as const;
</script>

<footer class="border-t border-hairline bg-canvas/80 backdrop-blur-md">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="flex flex-col items-center gap-4">
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
			<p class="text-xs text-muted-soft">&copy; 2025 Pickea. Todos los derechos reservados.</p>
		</div>
	</div>
</footer>