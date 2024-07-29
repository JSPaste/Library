enum APIEndpointVersion {
	v2 = 2,
	v3 = 3
}

type RequestOptions = {
	headers: Record<string, string>;
	retries: number;
	timeout: number;
};

type ClientOptions = {
	api: string;
	version: APIEndpointVersion;
	request: Partial<RequestOptions>;
};

export { APIEndpointVersion };
export type { RequestOptions, ClientOptions };
