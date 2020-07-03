## TAU Components > Vue example

### Introduction
			
TAU component integrates very efficiently in applications built in Vue.
Using it does not involve any special actions on the part of the developer.

### Example

<iframe src="./apps/vue/index.html" width="360px" height="640px"></iframe>

[Example](./apps/vue/index.html)

![QR code](./images/vue-QR.png)

###	Implementation

In the VUE framework, the developer assembles the application from components that he defines.
For example, component TAU Spin is defined like any other component in VUE and does not require
from the developer no specific knowledge. Component configuration for needs developer is done by setting the desired parameters.

#### Vue component based on TAU Spin

```javascript
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
```


Licensed under [MIT License](license.html) by Samsung Electronics Co., Ltd. &copy;  2020
ver 0.1