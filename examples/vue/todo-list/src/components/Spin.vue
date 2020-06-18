<template>
	<tau-spin class="default-spin"
		min="1902"
		max="2050"
		:value=year
		loop="enabled"
		roll-height="custom"
		item-height="50"
		momentum-level="1"
		duration="500">
	</tau-spin>
</template>

<script>
import '../lib/spin.js';

export default {
	name: 'Spin',
	data: function() {
		return {
			year: 2020
		}
	}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../lib/spin.css';

.default-spin {
	height: 150px;
	font-size: 50px;
	width: 200px;
}
.default-spin .ui-spin-item-selected {
	font-size: 50px;
}
</style>
