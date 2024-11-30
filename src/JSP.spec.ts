import { afterAll, describe, expect, test } from 'bun:test';
import { JSP } from './JSP.ts';

const jsp = new JSP();

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
	jsp.remove(key, secret).catch(() => console.error(`Failed to cleanup "${key}" with secret "${secret}"`));
};

describe('publish', async () => {
	test('should response parameters be defined and valid', async () => {
		// Server should prefer "key" over "keyLength"
		const response = await jsp.publish(commonData.hello, {
			password: commonPrivate,
			key: commonPrivate,
			keyLength: 20,
			secret: commonPrivate
		});

		expect(response.key).toBeDefined();
		expect(response.key).toBe(commonPrivate);
		expect(response.secret).toBeDefined();
		expect(response.secret).toBe(commonPrivate);
		expect(response.url).toBeDefined();

		testCleanup(response.key, response.secret);
	});

	test('should response "key" length be the same as "keyLength"', async () => {
		const keyLength = 20;
		const response = await jsp.publish(commonData.hello, {
			keyLength
		});

		expect(response.key).toBeDefined();
		expect(response.key.length).toBe(keyLength);
		expect(response.secret).toBeDefined();
		expect(response.url).toBeDefined();

		testCleanup(response.key, response.secret);
	});
});

describe('access', async () => {
	const document = await jsp.publish(commonData.hello, {
		secret: commonPrivate
	});

	const documentProtected = await jsp.publish(commonData.hello, {
		password: commonPrivate,
		secret: commonPrivate
	});

	afterAll(() => {
		testCleanup(document.key, commonPrivate);
		testCleanup(documentProtected.key, commonPrivate);
	});

	test('should response parameters be defined and valid', async () => {
		const response = await jsp.access(document.key);

		expect(response.key).toBeDefined();
		expect(response.key).toBe(document.key);
		expect(response.data).toBeDefined();
		expect(response.data).toBe(commonData.hello);
		expect(response.url).toBeDefined();

		testCleanup(response.key, commonPrivate);
	});

	test('should fail on protected document', async () => {
		const responsePromise = jsp.access(documentProtected.key);

		expect(responsePromise).rejects.toThrowError();
	});

	test('should fail on bad password protected document', async () => {
		const responsePromise = jsp.access(documentProtected.key, { password: commonPrivateInvalid });

		expect(responsePromise).rejects.toThrowError();
	});
});
