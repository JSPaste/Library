export interface RequestOptions {
	endpoint: string;
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	headers?: Record<string, string | undefined>;
	body?: string;
}
