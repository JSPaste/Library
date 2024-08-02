import { merge } from 'ts-deepmerge';
import { version as libraryVersion } from '../package.json';
import { HTTP } from './HTTP.ts';
import { access } from './endpoints/v2/access.ts';
import { edit } from './endpoints/v2/edit.ts';
import { publish } from './endpoints/v2/publish.ts';
import { remove } from './endpoints/v2/remove.ts';
import { APIEndpointVersion, type ClientOptions } from './types/JSP.ts';
import type { AccessOptionsV2 } from './types/endpoints/access.ts';
import type { EditOptionsV2 } from './types/endpoints/edit.ts';
import type { PublishOptionsV2 } from './types/endpoints/publish.ts';

export class JSP extends HTTP {
	private static readonly defaultRequestOptions: RequestInit = {
		headers: {
			'User-Agent': `JSPasteHeadless/${libraryVersion} (https://github.com/jspaste/library)`
		}
	};

	private static readonly defaultOptions: ClientOptions = {
		api: 'https://jspaste.eu/api',
		version: APIEndpointVersion.v2,
		request: JSP.defaultRequestOptions
	};

	public constructor(clientOptions: Partial<Omit<ClientOptions, 'version'>>) {
		const options = merge(JSP.defaultOptions, clientOptions) as ClientOptions;

		const rootEndpoint: string = options.api.replace(/\/+$/, '').concat(`/v${options.version}`);

		super(options, rootEndpoint);
	}

	public async access(key: string, options?: AccessOptionsV2) {
		return access(this.fetch.bind(this), key, options);
	}

	public async publish(data: string, options?: PublishOptionsV2) {
		return publish(this.fetch.bind(this), data, options);
	}

	public async edit(data: string, name: string, secret: string, options?: EditOptionsV2) {
		return edit(this.fetch.bind(this), data, name, secret, options);
	}

	public async remove(name: string, secret: string) {
		return remove(this.fetch.bind(this), name, secret);
	}
}
