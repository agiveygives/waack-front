<script lang="ts">
	import { Header } from '@comp/Header/';
	import Button from '@smui/button';
	import { Icon, Label } from '@smui/common';
	import { exportPDF } from '../../../helpers/pdf';
	import type { User } from '../../../types/user';
	import { initialUserInfo, userInfo } from '../../../store/login';

	let userValue: User = initialUserInfo;
	userInfo.subscribe((value) => (userValue = value));

	const getPromotionTitle = () => {
		switch (userValue.title) {
			case 'apprentice':
				return 'developer';
			case 'developer':
				return 'senior developer';
			case 'senior developer':
				return 'solution architect';
			case 'solution architect':
				return 'super solution architect';
			default:
				return '';
		}
	};
	const handleExport = () => {
		exportPDF(userValue.name, getPromotionTitle().toUpperCase());
	};

	const handleLink = () => {
		window.open(
			'https://docs.google.com/spreadsheets/d/1-2M_UXWp1zahZsDmRmL7AHvKwGnl4Ggk0OgMPUvwJ7Q/edit#gid=1173311128'
		);
	};
</script>

<Header header="Tech Career Progression" />
<div>
	<Button on:click={handleLink}>
		<Icon class="material-icons">link</Icon>
		<Label>Tech career progression framework</Label>
	</Button>
</div>
<div>
	<Button on:click={handleExport}>
		<Icon class="material-icons">file_download</Icon>
		<Label>Generate Promotion Document</Label>
	</Button>
</div>
