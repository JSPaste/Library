import { merge } from 'ts-deepmerge';
import type { ClientOptions } from './types/JSP.ts';

export class HTTP {
	protected readonly options: ClientOptions;
	protected readonly rootEndpoint: string;

	protected constructor(options: ClientOptions, rootEndpoint: string) {
		this.options = options;
		this.rootEndpoint = rootEndpoint;
	}

	public async fetch<TResponse>(endpoint: string, options: RequestInit): Promise<TResponse> {
		const requestOptions = merge(options, this.options.request) as RequestInit;

		const response = await fetch(this.rootEndpoint + endpoint, requestOptions);

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
