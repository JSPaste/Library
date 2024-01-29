import type { HTTPOptions } from '../interfaces/request/HTTPOptions.ts';
import type { RequestOptions } from '../interfaces/request/RequestOptions.ts';

type OverrideRequestOptions = Omit<RequestOptions, 'endpoint' | 'method'>;

export class HTTP {
	private readonly options: HTTPOptions;

	public constructor(options: HTTPOptions) {
		this.options = options;
	}

	public async get<TResponse>(endpoint: string, options?: OverrideRequestOptions) {
		const requestOptions = {
			...options,
			endpoint,
			method: 'GET'
		} as const;

		return this.request<TResponse>(requestOptions);
	}

	public async delete<TResponse>(endpoint: string, options?: OverrideRequestOptions) {
		const requestOptions = {
			...options,
			endpoint,
			method: 'DELETE'
		} as const;

		return this.request<TResponse>(requestOptions);
	}

	public async post<TResponse>(endpoint: string, options?: OverrideRequestOptions) {
		const requestOptions = {
			...options,
			endpoint,
			method: 'POST'
		} as const;

		return this.request<TResponse>(requestOptions);
	}

	public async put<TResponse>(endpoint: string, options?: OverrideRequestOptions) {
		const requestOptions = {
			...options,
			endpoint,
			method: 'PUT'
		} as const;

		return this.request<TResponse>(requestOptions);
	}

	public async patch<TResponse>(endpoint: string, options?: OverrideRequestOptions) {
		const requestOptions = {
			...options,
			endpoint,
			method: 'PATCH'
		} as const;

		return this.request<TResponse>(requestOptions);
	}

	private async request<TResponse>(options: RequestOptions) {
		const requestOptions = {
			method: options.method,
			headers: {
				...this.options.headers
			},
			body: options.body
		} as const;

		return this.parseResponse<TResponse>(await fetch(options.endpoint, requestOptions));
	}

	private async parseResponse<TResponse>(response: Response): Promise<TResponse> {
		if (response.headers.get('Content-Type')?.startsWith('application/json'))
			return response.json() as TResponse;

		throw new Error('Unknown response type');
	}
}
