import { describe, test } from 'bun:test';
import { JSP } from '../src';

const localEndpoint = 'http://[::1]:4000/api';

describe('V1', () => {
	const jsp = new JSP({
		api: localEndpoint,
		version: 1,
		http: {
			timeout: 10000
		}
	});

	const data = 'Hello, World!';

	test('publish', async () => {
		const response = await jsp.publish(data);

		console.log(response);
		console.debug(response);
	});
});

describe('V2', () => {
	const jsp = new JSP({
		api: localEndpoint,
		version: 1,
		http: {
			timeout: 10000
		}
	});

	const data = 'Hello, World!';

	test('publish', async () => {
		const response = await jsp.publish(data);

		console.log(response);
		console.debug(response);
	});
});
