import { deepmerge } from 'deepmerge-ts';
import { version as libraryVersion } from '../package.json';
import { HTTP } from './HTTP.ts';
import { access } from './endpoints/v2/access.ts';
import { edit } from './endpoints/v2/edit.ts';
import { publish } from './endpoints/v2/publish.ts';
import { remove } from './endpoints/v2/remove.ts';
import type { ClientOptions } from './types/JSP.ts';
import type { AccessOptions } from './types/endpoints/access.ts';
import type { EditOptions } from './types/endpoints/edit.ts';
import type { PublishOptions } from './types/endpoints/publish.ts';

export class JSP {
	private static readonly defaultOptions: ClientOptions = {
		api: 'https://paste.inetol.net/api',
		request: {
			headers: {
				'User-Agent': `JSPasteHeadless/${libraryVersion} (https://github.com/jspaste/library)`
			}
		}
	};

	private readonly http: HTTP;

	public constructor(clientOptions?: Partial<ClientOptions>) {
		const options = clientOptions
			? (deepmerge(JSP.defaultOptions, clientOptions) as ClientOptions)
			: JSP.defaultOptions;

		this.http = new HTTP(options);
	}

	/**
	 * @version API V2
	 */
	public async access(key: string, options?: AccessOptions) {
		return access(this.http, key, options);
	}

	/**
	 * @version API V2
	 */
	public async publish(data: string, options?: PublishOptions) {
		return publish(this.http, data, options);
	}

	/**
	 * @version API V2
	 */
	public async edit(data: string, name: string, secret: string, options?: EditOptions) {
		return edit(this.http, data, name, secret, options);
	}

	/**
	 * @version API V2
	 */
	public async remove(name: string, secret: string) {
		return remove(this.http, name, secret);
	}
}
