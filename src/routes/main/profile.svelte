<h1>PROFILE</h1>

<script>
	import Button from '@smui/button';
	import Card, { Content, Actions } from '@smui/card';
	import Textfield from '@smui/textfield';
	import { Label, Icon } from '@smui/common';
	import { Img } from '@smui/common/elements';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	
	let name = '';
	let username = '';
	let showCard = false;
</script>

<style>.flexbox-container {
display: flex;
align-items: center;
justify-content: center;
flex-direction: column; 
padding: 150px;
}</style>

<svelte:head>
	<!-- Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700">
	
  <!-- Material Typography -->
	<link rel="stylesheet" href="https://unpkg.com/@material/typography@13.0.0/dist/mdc.typography.css" />
	
	<!-- SMUI -->
	<link rel="stylesheet" href="https://unpkg.com/svelte-material-ui/bare.css" />
</svelte:head>


<div class="flexbox-container">	

<DataTable table$aria-label="People list" style="max-width: 100%;">

  <Body>
    <Row>
      <Cell>Username</Cell>
      <Cell>{username}</Cell>
     
    </Row>
    <Row>
      <Cell>Name</Cell>
      <Cell>{name}</Cell>
    </Row>
  </Body>
</DataTable>

<h3>
	Are you sure you want log out? If you forget your password you can never come back in.....and will then be unable to get promoted....and then will lose your job.....and then will never again recieve gainful employment
</h3>
  <Button
    on:click={() => clicked++}
    variant="unelevated"
    color="Primary"
    style="width: 80%;"
  >
    <Label>Logout</Label>
  </Button>
</div>
