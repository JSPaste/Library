type PublishOptionsV2 = {
	key?: string;
	keyLength?: string;
	secret?: string;
	password?: string;
	lifetime?: string;
};

type PublishResponseV2 = {
	key: string;
	secret: string;
	url?: string;
	expirationTimestamp?: number;
};

export type { PublishOptionsV2, PublishResponseV2 };
