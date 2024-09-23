import { merge } from 'ts-deepmerge';
import { version as libraryVersion } from '../package.json';
import { HTTP } from './HTTP.ts';
import { access } from './endpoints/v2/access.ts';
import { edit } from './endpoints/v2/edit.ts';
import { publish } from './endpoints/v2/publish.ts';
import { remove } from './endpoints/v2/remove.ts';
import type { ClientOptions } from './types/JSP.ts';
import type { AccessOptionsV2 } from './types/endpoints/access.ts';
import type { EditOptionsV2 } from './types/endpoints/edit.ts';
import type { PublishOptionsV2 } from './types/endpoints/publish.ts';

export class JSP {
	private static readonly defaultRequestOptions: RequestInit = {
		headers: {
			'User-Agent': `JSPasteHeadless/${libraryVersion} (https://github.com/jspaste/library)`
		}
	};

	private static readonly defaultOptions: ClientOptions = {
		api: 'https://api.inetol.net/jspaste',
		request: JSP.defaultRequestOptions
	};

	private readonly http: HTTP;

	public constructor(clientOptions?: Partial<ClientOptions>) {
		const options = clientOptions
			? (merge(JSP.defaultOptions, clientOptions) as ClientOptions)
			: JSP.defaultOptions;

		this.http = new HTTP(options);
	}

	/**
	 * @version API V2
	 */
	public async access(key: string, options?: AccessOptionsV2) {
		return access(this.http, key, options);
	}

	/**
	 * @version API V2
	 */
	public async publish(data: string, options?: PublishOptionsV2) {
		return publish(this.http, data, options);
	}

	/**
	 * @version API V2
	 */
	public async edit(data: string, name: string, secret: string, options?: EditOptionsV2) {
		return edit(this.http, data, name, secret, options);
	}

	/**
	 * @version API V2
	 */
	public async remove(name: string, secret: string) {
		return remove(this.http, name, secret);
	}
}
