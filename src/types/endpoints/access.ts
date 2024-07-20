export type AccessOptionsV2 = {
	password?: string;
};

export type AccessResponseV2 = {
	key: string;
	data: string;
	url?: string;
	expirationTimestamp?: number;
};
