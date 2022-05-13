<script>
	import { Panel, Header, Content } from '@smui-extra/accordion';
	import { initialAccomplishmentData } from '../../store/accomplishments';
	export let accomplishment = initialAccomplishmentData;
</script>

<Panel>
	<Header>
		{accomplishment.date}
		<span slot="description">{accomplishment.description}</span>
	</Header>
	<Content>{accomplishment.content}</Content>
</Panel>
