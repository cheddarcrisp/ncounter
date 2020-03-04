<div class="progress-bar">
	<span class="progress" {style}></span>
	<span class="text">{value} / {max}</span>
</div>
<script>
export let value;
export let max;

$: style = `width: ${(Math.min(1, value / max) * 100)}%`;
</script>
<style>
	.progress-bar {
		width: 100%;

		margin: 3px 0;

		background-color: var(--background-primary);
		color: var(--text-primary);

		border: 1px solid var(--text-primary);
		height: 20px;

		position: relative;
	}

	.progress-bar > .progress {
		display: block;
		background-color: var(--background-color);
		height: 100%;
	}

	.progress-bar > .text {
		position: absolute;

		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		text-align: center;
	}
</style>