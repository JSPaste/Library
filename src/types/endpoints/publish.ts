type PublishOptionsV2 = {
	password?: string;
	key?: string;
	keyLength?: number;
	secret?: string;
};

type PublishResponseV2 = {
	key: string;
	secret: string;
	url: string;
	expirationTimestamp: number;
};

export type { PublishOptionsV2, PublishResponseV2 };
