export interface IDocument {
	key: string;
	data: string;
	url: string;
	password?: string;
	lifetime?: number;
	expirationTimestamp?: number;
	secret?: string;
}
