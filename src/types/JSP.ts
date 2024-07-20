export enum APIEndpointVersion {
	v2 = 2,
	v3 = 3
}

export type RequestOptions = {
	headers: Record<string, string>;
	retries: number;
	timeout: number;
};

export type ClientOptions = {
	api: string;
	version: APIEndpointVersion;
	request: Partial<RequestOptions>;
};
