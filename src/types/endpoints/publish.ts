type PublishOptions = {
	password?: string;
	key?: string;
	keyLength?: number;
	secret?: string;
};

type PublishResponse = {
	key: string;
	secret: string;
	url: string;
};

export type { PublishOptions, PublishResponse };
