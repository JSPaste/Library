import { HTTP } from './HTTP';
import { defaultJSPOptions } from '../utils/constants';
import type { JSPClientOptions } from '../interfaces/request/JSPClientOptions';
import type { IDocument } from '../interfaces/response/Document';
import type { IClientDocument } from '../interfaces/response/ClientDocument';
import type { PublishOptions } from '../interfaces/request/document/PublishOptions';
import type { AccessOptions } from '../interfaces/request/document/AccessOptions';
import type { EditOptions } from '../interfaces/request/document/EditOptions';
import type { RemoveOptions } from '../interfaces/request/document/RemoveOptions';

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
		return this.http.get<IDocument>(this.endpoint + '/documents/' + key, {
			headers: {
				password: options?.password
			}
		});
	}

	public async exists(key: string) {
		return this.http.get<boolean>(this.endpoint + '/documents/' + key + '/exists');
	}

	public async publish(data: any, options?: PublishOptions) {
		return this.http.post<IClientDocument>(this.endpoint + '/documents', {
			body: data,
			headers: {
				key: options?.key,
				secret: options?.secret,
				password: options?.password,
				lifetime: options?.lifetime?.toString()
			}
		});
	}

	public async edit(key: string, options: EditOptions) {
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
