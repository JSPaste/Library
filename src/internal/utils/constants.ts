import * as pkg from '../../../package.json';
import type { JSPClientOptions } from '../interfaces/request/JSPClientOptions.ts';
import type { HTTPOptions } from '../interfaces/request/HTTPOptions.ts';

export enum APIVersions {
	v1 = 1,
	v2 = 2
}

export const defaultHTTPOptions = {
	headers: {
		'User-Agent': `JSPasteHeadless/${pkg.version} (https://github.com/jspaste/library)`
	},
	retries: 3,
	timeout: 10000
} as const satisfies Required<HTTPOptions>;

export const defaultJSPOptions = {
	api: 'https://jspaste.eu/api',
	version: APIVersions.v2,
	http: defaultHTTPOptions
} as const satisfies Required<JSPClientOptions>;
