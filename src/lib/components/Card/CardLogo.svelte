<script lang="ts">
	export let src: string;
	export let alt: string;
	export let size = 50;
	export let radius = '15px';
	export let classes = '';
	export let fit = 'contain';
	
</script>

<img class={`rounded-${radius} ${classes} aspect-square object-fit-contain`} {src} {alt} height={size} width={size}  style="object-fit: {fit};" />
