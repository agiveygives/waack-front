<script lang="ts">
	import { Panel, Header, Content } from '@smui-extra/accordion';
	import Chip, { Set, TrailingAction, Text } from '@smui/chips';
	import type { Accomplishment } from '../../types/accomplishment';
	import { initialAccomplishmentData } from '../../store/accomplishments';
	export let accomplishment: Accomplishment = initialAccomplishmentData;
	const tags = accomplishment?.tags?.split(',');
</script>

<Panel>
	<Header>
		{accomplishment.date}
		<span slot="description">{accomplishment.description}</span>
	</Header>
	<Content>
		{accomplishment.content}
		<Set chips={tags} let:chip input>
			<Chip {chip}>
				<Text>{chip}</Text>
				<TrailingAction icon$class="material-icons">cancel</TrailingAction>
			</Chip>
		</Set>
	</Content>
</Panel>
