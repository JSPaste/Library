export type PublishOptionsV2 = {
	key?: string;
	keyLength?: string;
	secret?: string;
	password?: string;
	lifetime?: string;
};

export type PublishResponseV2 = {
	key: string;
	secret: string;
	url?: string;
	expirationTimestamp?: number;
};
