import type { HTTPOptions, RequestOptions } from '../types/Client.ts';

export class HTTP {
	private readonly options: HTTPOptions;

	public constructor(options: HTTPOptions) {
		this.options = options;
	}

	public async fetch<TResponse>(endpoint: string, options: Omit<RequestOptions, 'endpoint'>): Promise<TResponse> {
		const requestOptions = {
			...options,
			headers: {
				...this.options.headers,
				...options.headers
			}
		};

		const response = await fetch(endpoint, requestOptions);

		return this.parseResponse<TResponse>(response);
	}

	private parseResponse<TResponse>(response: Response) {
		const contentType = response.headers.get('Content-Type');

		if (contentType?.startsWith('application/json')) {
			return response.json() as Promise<TResponse>;
		}

		throw new Error('Unknown response type');
	}
}
