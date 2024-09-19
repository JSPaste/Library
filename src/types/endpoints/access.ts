type AccessOptionsV2 = {
	password?: string;
};

type AccessResponseV2 = {
	key: string;
	data: string;
	url: string;
	expirationTimestamp: number;
};

export type { AccessOptionsV2, AccessResponseV2 };
