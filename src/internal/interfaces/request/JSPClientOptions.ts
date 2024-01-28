import type { APIVersions } from '../../utils/constants.ts';
import type { HTTPOptions } from './HTTPOptions.ts';

export interface JSPClientOptions {
	api: string;
	version: APIVersions;
	http: HTTPOptions;
}
