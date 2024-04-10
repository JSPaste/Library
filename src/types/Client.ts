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
	http: HTTPOptions;
};

type RequestOptions = {
	endpoint: string;
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	headers?: Record<string, string | undefined>;
	body?: string;
};

export { APIEndpointVersion };
export type { HTTPOptions, JSPClientOptions, RequestOptions };
