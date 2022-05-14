<script lang="ts">
	import type { User } from '../../../types/user';
	import { initialUserInfo, userInfo } from '../../../store/login';

	let userValue: User = initialUserInfo;
	userInfo.subscribe((value) => (userValue = value));
</script>

<h1>Welcome, {userValue.name}</h1>
