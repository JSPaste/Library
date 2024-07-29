type RequestRequestOptions = {
	endpoint: string;
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	headers?: Record<string, string>;
	body?: string;
};

export type { RequestRequestOptions };
