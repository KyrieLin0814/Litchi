<template>
	<div id="app">
		<router-view :key="activeDate"></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				activeDate: 1
			}
		},
		mounted() {

		},
		methods: {
			refreash() {
				this.activeDate = new Date()
			}
		}
	}
</script>