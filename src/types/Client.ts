enum APIEndpointVersion {
	v1 = 1,
	v2 = 2
}

type HTTPOptions = {
	headers: Record<string, string>;
	retries: number;
	timeout: number;
};

type JSPClientOptions = {
	api: string;
	version: APIEndpointVersion;
	http: Partial<HTTPOptions>;
};

type RequestOptions = {
	endpoint: string;
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	headers?: Record<string, string>;
	body?: string;
};

export { APIEndpointVersion };
export type { HTTPOptions, JSPClientOptions, RequestOptions };
