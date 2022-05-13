<script>
	import { userInfo } from '../../../store/login';

	let /** @type {import('../../../types/user').User} */ userValue = {
			name: '',
			email: '',
			title: '',
			manager: ''
		};
	userInfo.subscribe((value) => (userValue = value));
</script>

<h1>Welcome, {userValue.name}</h1>
