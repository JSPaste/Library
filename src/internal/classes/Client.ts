import { HTTP } from './HTTP';
import { defaultJSPOptions } from '../utils/constants';
import type { JSPClientOptions } from '../interfaces/request/JSPClientOptions';
import type { IDocument } from '../interfaces/response/Document';
import type { IClientDocument } from '../interfaces/response/ClientDocument';
import type { PublishOptions } from '../interfaces/request/PublishOptions';
import type { AccessOptions } from '../interfaces/request/AccessOptions';

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

	public async publish(data: any, options?: PublishOptions) {
		return this.http.post<IClientDocument>(this.endpoint + '/documents', {
			body: data,
			headers: {
				secret: options?.secret,
				password: options?.password,
				lifetime: options?.lifetime?.toString()
			}
		});
	}
}
