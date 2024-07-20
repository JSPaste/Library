import { merge } from 'ts-deepmerge';
import { version as libraryVersion } from '../package.json';
import { Request } from './Request.ts';
import { access } from './endpoints/v2/access.ts';
import { publish } from './endpoints/v2/publish.ts';
import { APIEndpointVersion, type ClientOptions, type RequestOptions } from './types/JSP.ts';
import type { AccessOptionsV2 } from './types/endpoints/access.ts';
import type { PublishOptionsV2 } from './types/endpoints/publish.ts';

export class JSP extends Request {
	private static readonly defaultRequestOptions: RequestOptions = {
		headers: {
			'User-Agent': `JSPasteHeadless/${libraryVersion} (https://github.com/jspaste/library)`
		},
		retries: 3,
		timeout: 10000
	};

	private static readonly defaultOptions: ClientOptions = {
		api: 'https://jspaste.eu/api',
		version: APIEndpointVersion.v2,
		request: JSP.defaultRequestOptions
	};

	public constructor(clientOptions: Omit<ClientOptions, 'version'>) {
		const options = merge(JSP.defaultOptions, clientOptions) as ClientOptions;
		const rootEndpoint: string = options.api.replace(/\/+$/, '').concat(`/v${options.version}`);

		super(options, rootEndpoint);
	}

	public async access(key: string, options?: AccessOptionsV2) {
		return access(this.fetch.bind(this), key, options);
	}

	public async publish(data: any, options?: PublishOptionsV2) {
		return publish(this.fetch.bind(this), data, options);
	}
}
