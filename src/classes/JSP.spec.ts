import { describe, test } from 'bun:test';
import { JSP } from './JSP.ts';

const endpoint = 'https://paste.inetol.net/api';

describe('V1', () => {
	const jsp = new JSP({
		api: endpoint,
		version: 1,
		http: {
			timeout: 5000
		}
	});

	const data = 'Hello, World!';

	test('publish', async () => {
		const response = await jsp.publish(data);

		console.debug(response);
	});
});

describe('V2', () => {
	const jsp = new JSP({
		api: endpoint,
		version: 2,
		http: {
			timeout: 5000
		}
	});

	const data = 'Hello, World!';

	test('publish', async () => {
		const response = await jsp.publish(data);

		console.debug(response);
	});
});
