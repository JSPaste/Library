import { describe, expect, test } from 'bun:test';
import { JSP } from './JSP.ts';

const endpoint = 'https://paste.inetol.net/api';

describe('V2', () => {
	const jsp = new JSP({
		api: endpoint
	});

	const commonData = {
		hello: 'Hello, World!',
		bye: 'Bye, World!',
		object: {
			sample: 'Hello, World!'
		},
		binary: new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33, 10])
	};

	/**
	 * An unique key/secret/password for tests.
	 */
	const commonPrivate: string = Date.now().toString();
	const commonPrivateInvalid: string = '_:_:wrongdingdong:_:_';

	const testCleanup = (key: string, secret: string) => {
		jsp.remove(key, secret);
	};

	describe('publish', () => {
		test('data only', async () => {
			const response = await jsp.publish(commonData.hello);
			const result = await jsp.access(response.key);

			expect(result.data).toBeDefined();
			expect(result.data).toBe(commonData.hello);

			testCleanup(response.key, response.secret);
		});

		test('key', async () => {
			const response = await jsp.publish(commonData.hello, {
				key: commonPrivate
			});

			expect(response.key).toBeDefined();
			expect(response.key).toBe(commonPrivate);

			testCleanup(response.key, response.secret);
		});

		test.todo('keyLength', async () => {
			const response = await jsp.publish(commonData.hello, {
				keyLength: 20
			});

			expect(response.key).toBeDefined();
			expect(response.key).toHaveLength(20);

			testCleanup(response.key, response.secret);
		});

		test('password/secret', async () => {
			const response = await jsp.publish(commonData.hello, {
				password: commonPrivate,
				secret: commonPrivate
			});

			expect(response.secret).toBe(commonPrivate);

			const fail = await jsp.access(response.key, {
				password: commonPrivateInvalid
			});

			expect(fail.data).toBeUndefined();

			const result = await jsp.access(response.key, {
				password: commonPrivate
			});

			expect(result.data).toBeDefined();
			expect(result.data).toBe(commonData.hello);

			testCleanup(response.key, response.secret);
		});
	});
});
