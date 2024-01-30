import { HTTP } from './HTTP';
import { APIVersions, defaultJSPOptions } from '../utils/constants';
import type { JSPClientOptions } from '../interfaces/request/JSPClientOptions';
import type { PublishOptions } from '../interfaces/request/document/PublishOptions';
import type { AccessOptions } from '../interfaces/request/document/AccessOptions';
import type { EditOptions } from '../interfaces/request/document/EditOptions';
import type { RemoveOptions } from '../interfaces/request/document/RemoveOptions';
import type { AccessedDocument } from '../interfaces/response/AccessedDocument';
import type { PublishedDocument } from '../interfaces/response/PublishedDocument';

export class Client {
	private http: HTTP;
	private readonly options: JSPClientOptions;
	private readonly endpoint: string;

	public constructor(options: Partial<JSPClientOptions> = {}) {
		this.options = { ...defaultJSPOptions, ...options };
		this.endpoint = this.options.api + '/v' + this.options.version;

		this.http = new HTTP(this.options.http);
	}

	public async access(key: string, options?: AccessOptions) {
		return this.http.get<AccessedDocument>(this.endpoint + '/documents/' + key, {
			headers: {
				password: options?.password
			}
		});
	}

	public async publish(data: any, options?: PublishOptions) {
		return this.http.post<PublishedDocument>(this.endpoint + '/documents', {
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
		if (this.options.version < APIVersions.v2)
			throw new Error('"Exists" can only be used with API version 2 or higher.');

		return this.http.get<boolean>(this.endpoint + '/documents/' + key + '/exists');
	}

	public async edit(key: string, options: EditOptions) {
		if (this.options.version < APIVersions.v2)
			throw new Error('"Edit" can only be used with API version 2 or higher.');

		return this.http.patch<{ edited: boolean }>(this.endpoint + '/documents/' + key, {
			body: options.newBody,
			headers: {
				secret: options?.secret
			}
		});
	}

	public async remove(key: string, options: RemoveOptions) {
		return this.http.delete<{ removed: boolean }>(this.endpoint + '/documents/' + key, {
			headers: {
				secret: options?.secret
			}
		});
	}
}
