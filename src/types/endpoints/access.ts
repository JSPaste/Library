type AccessOptions = {
	password?: string;
};

type AccessResponse = {
	key: string;
	data: string;
	url: string;
};

export type { AccessOptions, AccessResponse };
