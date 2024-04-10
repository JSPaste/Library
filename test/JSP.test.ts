// TODO: Test suite

import { JSP } from '../src';

const jsp = new JSP({
	api: 'https://api.inetol.net/jspaste'
});

jsp.access('test').then(console.log);
