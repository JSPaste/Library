import { describe, test } from 'bun:test';
import { JSP } from './JSP.ts';

const endpoint = 'https://paste.inetol.net/api';

describe('V2', () => {
	const jsp = new JSP({
		api: endpoint,
		request: {
			timeout: 5000
		}
	});

	const data = 'Hello, World!';
	let key: string;

	test('publish', async () => {
		const response = await jsp.publish(data);

		key = response.key;

		console.debug(response);
	});

	test('access', async () => {
		const response = await jsp.access(key);

		console.debug(response);
	});
});
