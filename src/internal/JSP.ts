import { HTTP } from './HTTP.ts';
import type { JSPOptions } from './interfaces/JSPOptions.ts';
import { defaultJSPOptions } from './utils/constants.ts';
import type { AccessResponse } from './interfaces/AccessResponse.ts';

export class JSP {
	private http: HTTP;
	private readonly options: JSPOptions;
	private readonly endpoint: string;

	public constructor(options: Partial<JSPOptions> = {}) {
		this.options = { ...defaultJSPOptions, ...options };
		this.endpoint = this.options.api + '/v' + this.options.version;

		this.http = new HTTP(this.options.http);
	}

	public async access(resource: string) {
		return (await this.http.get(this.endpoint + '/documents/' + resource)) as AccessResponse;
	}
}
