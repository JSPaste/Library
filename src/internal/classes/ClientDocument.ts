import { Document } from './Document';
import type { Client } from './Client';
import type { IClientDocument } from '../interfaces/response/ClientDocument';

export class ClientDocument extends Document implements IClientDocument {
	public override secret: string;
	public edited?: boolean;
	public removed?: boolean;

	public constructor(
		client: Client,
		{ key, secret, data, url, password, expirationTimestamp, edited, removed }: IClientDocument
	) {
		super(client, { key, data, url, password, expirationTimestamp, secret });

		this.secret = secret;
		this.edited = edited;
		this.removed = removed;
	}

	protected override refresh({
		key,
		data,
		url,
		password,
		expirationTimestamp,
		secret,
		edited,
		removed
	}: IClientDocument) {
		this.key = key;
		this.data = data;
		this.url = url;
		this.password = password;
		this.expirationTimestamp = expirationTimestamp;
		this.secret = secret;
		this.edited = edited;
		this.removed = removed;

		return this;
	}

	public async edit(data?: any) {
		if (data) this.data = data;

		return this.client
			.edit(this.key, { secret: this.secret, newBody: data || this.data })
			.then(({ edited }) => this.refresh({ ...this, edited }));
	}

	public async remove() {
		return this.client
			.remove(this.key, { secret: this.secret })
			.then(({ removed }) => this.refresh({ ...this, removed }));
	}
}
