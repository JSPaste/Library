import { merge } from 'ts-deepmerge';
import type { ClientOptions } from './types/JSP.ts';

export class HTTP {
	public readonly options: ClientOptions;

	public constructor(options: ClientOptions) {
		this.options = options;
	}

	public async fetch<TResponse>(endpoint: string, options: RequestInit): Promise<TResponse> {
		const requestOptions = merge(this.options.request, options) as RequestInit;

		const response = await fetch(this.options.api + endpoint, requestOptions);

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
