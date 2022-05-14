<script lang="ts">
	import { Panel, Header, Content } from '@smui-extra/accordion';
	import Chip, { Set, TrailingAction, Text } from '@smui/chips';
	import type { Accomplishment } from '../../types/accomplishment';
	import { initialAccomplishmentData } from '../../store/accomplishments';
	export let accomplishment: Accomplishment = initialAccomplishmentData;
	const tags =
		accomplishment && accomplishment.tags && accomplishment.tags[0]
			? accomplishment.tags[0].split(',')
			: [];
</script>

<Panel>
	<Header>
		{accomplishment.created}
		<span slot="description">{accomplishment.name}</span>
	</Header>
	<Content>
		{accomplishment.description}
		<Set chips={tags} let:chip input>
			<Chip {chip}>
				<Text>{chip}</Text>
				<TrailingAction icon$class="material-icons">cancel</TrailingAction>
			</Chip>
		</Set>
	</Content>
</Panel>
