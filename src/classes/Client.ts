import * as pkg from '../../package.json';
import { APIEndpointVersion, type HTTPOptions, type JSPClientOptions } from '../types/Client.ts';
import type { AccessOptions } from '../types/request/document/AccessOptions';
import type { EditOptions } from '../types/request/document/EditOptions';
import type { PublishOptions } from '../types/request/document/PublishOptions';
import type { RemoveOptions } from '../types/request/document/RemoveOptions';
import type { AccessedDocument } from '../types/response/AccessedDocument';
import type { PublishedDocument } from '../types/response/PublishedDocument';
import { HTTP } from './HTTP';

export class Client {
	private static readonly defaultHTTPOptions: HTTPOptions = {
		headers: {
			'User-Agent': `JSPasteHeadless/${pkg.version} (https://github.com/jspaste/library)`
		},
		retries: 3,
		timeout: 10000
	};

	private static readonly defaultJSPOptions: JSPClientOptions = {
		api: 'https://jspaste.eu/api',
		version: APIEndpointVersion.v2,
		http: Client.defaultHTTPOptions
	};

	private http: HTTP;
	private readonly options: JSPClientOptions;
	private readonly endpoint: string;

	public constructor(options: Partial<JSPClientOptions> = {}) {
		this.options = { ...Client.defaultJSPOptions, ...options };
		this.endpoint = `${this.options.api}/v${this.options.version}`;

		this.http = new HTTP(this.options.http);
	}

	public async access(key: string, options?: AccessOptions) {
		return this.http.get<AccessedDocument>(`${this.endpoint}/documents/${key}`, {
			headers: {
				password: options?.password
			}
		});
	}

	public async publish(data: any, options?: PublishOptions) {
		return this.http.post<PublishedDocument>(`${this.endpoint}/documents`, {
			body: data,
			headers: {
				key: options?.key,
				secret: options?.secret,
				password: options?.password,
				lifetime: options?.lifetime?.toString()
			}
		});
	}

	public async exists(key: string) {
		if (this.options.version < APIEndpointVersion.v2)
			throw new Error('"Exists" can only be used with API version 2 or higher.');

		return this.http.get<boolean>(`${this.endpoint}/documents/${key}/exists`);
	}

	public async edit(key: string, options: EditOptions) {
		if (this.options.version < APIEndpointVersion.v2)
			throw new Error('"Edit" can only be used with API version 2 or higher.');

		return this.http.patch<{ edited: boolean }>(`${this.endpoint}/documents/${key}`, {
			body: options.newBody,
			headers: {
				secret: options?.secret
			}
		});
	}

	public async remove(key: string, options: RemoveOptions) {
		return this.http.delete<{ removed: boolean }>(`${this.endpoint}/documents/${key}`, {
			headers: {
				secret: options?.secret
			}
		});
	}
}
