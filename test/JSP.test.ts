// TODO: Bun test suite

import { expect, test } from 'bun:test';
import { JSP } from '../src';

const jsp = new JSP({
	api: 'https://api.inetol.net/jspaste'
});

const data = 'Hello, World!';
const newDocument = await jsp.publish(data);
const accessDocument = await jsp.access(newDocument.key);

test('test', () => {
	expect(data).toBe(accessDocument.data);

	console.debug(newDocument);
	console.debug(accessDocument);
});
