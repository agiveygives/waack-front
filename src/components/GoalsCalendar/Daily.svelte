<div class="container">
	<div class="todo">
		<div class="col-header">Todo</div>

		<div class="goals-container" />
	</div>

	<div class="in-progress">
		<div class="col-header">In Progress</div>

		<div class="goals-container" />
	</div>

	<div class="done">
		<div class="col-header">Done</div>

		<div class="goals-container" />
	</div>
</div>

<style>
	.container {
		padding-top: 20px;
		height: 100%;
		width: 100%;
		display: grid;
		grid-auto-columns: 33%;
		grid-gap: 10px;
		flex: 1;
	}

	.col-header {
		text-align: center;
		font-family: 'Roboto';
	}

	.goals-container {
		height: 100%;
		border-radius: 5%;
		border: white solid 1px;
	}

	.todo {
		grid-column: 1 / 2;
	}

	.in-progress {
		grid-column: 2 / 3;
	}

	.done {
		grid-column: 3 / 4;
	}
</style>
