import type { HTTPOptions } from './interfaces/HTTPOptions.ts';

export class HTTP {
	private readonly options: HTTPOptions;

	public constructor(options: HTTPOptions) {
		this.options = options;
	}

	public async get(endpoint: string) {
		const requestOptions = {
			endpoint,
			method: 'GET'
		};

		return this.request(requestOptions);
	}

	public async delete(endpoint: string) {
		const requestOptions = {
			endpoint,
			method: 'DELETE'
		};

		return this.request(requestOptions);
	}

	public async post(endpoint: string) {
		const requestOptions = {
			endpoint,
			method: 'POST'
		};

		return this.request(requestOptions);
	}

	public async put(endpoint: string) {
		const requestOptions = {
			endpoint,
			method: 'PUT'
		};

		return this.request(requestOptions);
	}

	public async patch(endpoint: string) {
		const requestOptions = {
			endpoint,
			method: 'PATCH'
		};

		return this.request(requestOptions);
	}

	private async request(options: any) {
		const requestOptions = {
			method: options.method,
			headers: {
				...this.options.headers
			}
		};

		return this.parseResponse(await fetch(options.endpoint, requestOptions));
	}

	private async parseResponse(response: Response): Promise<unknown> {
		if (response.headers.get('Content-Type')?.startsWith('application/json')) {
			return response.json();
		}

		throw new Error('Unknown response type');
	}
}
