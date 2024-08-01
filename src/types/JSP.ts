enum APIEndpointVersion {
	v2 = 2,
	v3 = 3
}

type ClientOptions = {
	api: string;
	version: APIEndpointVersion;
	request: Partial<RequestInit>;
};

export { APIEndpointVersion };
export type { ClientOptions };
