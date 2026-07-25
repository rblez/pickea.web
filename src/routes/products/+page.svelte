<script lang="ts">
	import { base } from '$app/paths';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	$effect(() => {
		if (browser) {
			goto('/', { replaceState: true });
		}
	});
</script>