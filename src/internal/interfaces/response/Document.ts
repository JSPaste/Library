export interface IDocument {
	key: string;
	data: string;
	url: string;
	password?: string;
	expirationTimestamp?: number;
}
