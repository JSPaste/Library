import { Document } from './Document';
import type { Client } from './Client';
import type { IClientDocument } from '../interfaces/response/ClientDocument';

export class ClientDocument extends Document implements IClientDocument {
	public override secret: string;
	public deleted: boolean;

	public constructor(
		client: Client,
		{ key, secret, data, url, password, expirationTimestamp, deleted }: IClientDocument
	) {
		super(client, { key, data, url, password, expirationTimestamp, secret });

		this.secret = secret;
		this.deleted = deleted;
	}

	protected override refresh({
		key,
		data,
		url,
		password,
		expirationTimestamp,
		secret,
		deleted
	}: IClientDocument) {
		this.key = key;
		this.data = data;
		this.url = url;
		this.password = password;
		this.expirationTimestamp = expirationTimestamp;
		this.secret = secret;

		this.deleted = deleted;

		return this;
	}

	public async edit(data?: any) {
		return this.client
			.edit(this.key, { secret: this.secret, newBody: data || this.data })
			.then((res) => this.refresh(res));
	}

	public async remove() {
		return this.client
			.remove(this.key, { secret: this.secret })
			.then(({ deleted }) => this.refresh({ ...this, deleted }));
	}
}
