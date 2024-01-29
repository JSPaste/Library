import type { IDocument } from '../interfaces/response/Document';
import type { Client } from './Client';

export class Document implements IDocument {
	readonly client: Client;
	readonly key: string;
	readonly data: string;
	readonly url: string;
	readonly password?: string;
	readonly expirationTimestamp?: number;

	public constructor(
		client: Client,
		{ key, data, url, password, expirationTimestamp }: IDocument
	) {
		this.client = client;
		this.key = key;
		this.data = data;
		this.url = url;
		this.password = password;
		this.expirationTimestamp = expirationTimestamp;
	}

	public access() {
		this.client.access(this.key);
	}
}
