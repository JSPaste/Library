import { describe, test } from 'bun:test';
import { JSP } from '../src';

describe('V1', () => {
	const jsp = new JSP({
		api: 'https://api.inetol.net/jspaste',
		version: 1,
		http: {
			timeout: 10000
		}
	});

	const data = 'Hello, World!';

	test('publish', async () => {
		const response = await jsp.publish(data);

		console.debug(response);
	});
});
