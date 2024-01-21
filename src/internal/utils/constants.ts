import * as pkg from '../../../package.json';
import type { JSPOptions } from '../interfaces/JSPOptions.ts';
import type { HTTPOptions } from '../interfaces/HTTPOptions.ts';

export const defaultHTTPOptions = {
	headers: {
		'User-Agent': `JSPasteHeadless/${pkg.version} (https://github.com/jspaste/jspaste)`
	},
	retries: 3,
	timeout: 10000
} as const satisfies Required<HTTPOptions>;

export const defaultJSPOptions = {
	api: 'https://jspaste.eu/api',
	version: 1,
	http: defaultHTTPOptions
} as const satisfies Required<JSPOptions>;
