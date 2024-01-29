import type { IDocument } from '../interfaces/response/Document';
import type { Client } from './Client';

export class Document implements IDocument {
	protected readonly client: Client;
	public key: string;
	public data: string;
	public url: string;
	public password?: string;
	public lifetime?: number;
	public expirationTimestamp?: number;
	public secret?: string;

	public constructor(
		client: Client,
		{ key, data, url, password, lifetime, expirationTimestamp, secret }: IDocument
	) {
		this.client = client;
		this.key = key;
		this.data = data;
		this.url = url;
		this.password = password;
		this.lifetime = lifetime;
		this.expirationTimestamp = expirationTimestamp;
		this.secret = secret;
	}

	protected refresh({
		key,
		data,
		url,
		password,
		lifetime,
		expirationTimestamp,
		secret
	}: IDocument) {
		this.key = key;
		this.data = data;
		this.url = url;
		this.password = password;
		this.lifetime = lifetime;
		this.expirationTimestamp = expirationTimestamp;
		this.secret = secret;

		return this;
	}

	public setKey(key: IDocument['key']) {
		return this.refresh({ ...this, key });
	}

	public setData(data: IDocument['data']) {
		return this.refresh({ ...this, data });
	}

	public setPassword(password: IDocument['password']) {
		return this.refresh({ ...this, password });
	}

	public setSecret(secret: IDocument['secret']) {
		return this.refresh({ ...this, secret });
	}

	public setLifetime(lifetime: IDocument['lifetime']) {
		return this.refresh({ ...this, lifetime });
	}

	public async access() {
		return this.client.access(this.key).then((res) => this.refresh(res));
	}

	public async publish() {
		return this.client
			.publish(this.data, {
				key: this.key,
				lifetime:
					this.lifetime || this.expirationTimestamp
						? (this.expirationTimestamp ?? 0) - Date.now()
						: undefined,
				password: this.password,
				secret: this.secret
			})
			.then((res) => this.refresh(res));
	}
}
