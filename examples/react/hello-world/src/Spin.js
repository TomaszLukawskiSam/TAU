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
