## TAU Components > ReactJS example

### Example

Example of TAU integration with React JS.

<iframe src="./apps/reactjs/index.html" width="360px" height="640px"></iframe>

[Example](./apps/reactjs/index.html)

![QR code](./images/reactjs-QR.png)

### Implementation

The addition to the application complies with the rules for Web Components.

```javascript
import React from 'react';
import './assets/js/spin.js';
import './assets/css/spin.css';
import './assets/css/custom-spin.css';

class Spin extends React.Component {
    render() {
        return 	(<tau-spin class="default-spin"
		min="1902"
		max="2050"
		value="2002"
		loop="enabled"
		roll-height="custom"
		item-height="50"
		momentum-level="1"
		duration="500">
	    </tau-spin>
    )}
}

export default Spin;

```

Licensed under [MIT License](license.html) by Samsung Electronics Co., Ltd. &copy;  2020
ver 0.1