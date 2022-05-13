<script>
	import { initialUserInfo, userInfo } from '../../../store/login';

	let /** @type {import('../../../types/user').User} */ userValue = initialUserInfo;
	userInfo.subscribe((value) => (userValue = value));
</script>

<h1>Welcome, {userValue.name}</h1>
