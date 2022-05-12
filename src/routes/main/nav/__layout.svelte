<div class="nav">
	<div class="sidebar">
		<a href="/main/nav">Home</a>
		<a href="/main/nav/accomplishments">accomplishments</a>
		<a href="/main/nav/goals">goals</a>
	</div>
	<slot />
</div>

<style>
	.nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.sidebar {
		display: flex;
		flex-direction: column;
	}
</style>
