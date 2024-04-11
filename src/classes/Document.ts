import type { IDocument } from '../types/response/IDocument';
import type { Client } from './Client';

export class Document implements IDocument {
	public key: string;
	public data: string;
	public url?: string;
	public password?: string;
	public lifetime?: number;
	public expirationTimestamp?: number;
	public secret?: string;
	protected readonly client: Client;

	public constructor(client: Client, { key, data, url, password, lifetime, expirationTimestamp, secret }: IDocument) {
		this.client = client;
		this.key = key;
		this.data = data;
		this.url = url;
		this.password = password;
		this.lifetime = lifetime;
		this.expirationTimestamp = expirationTimestamp;
		this.secret = secret;
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

	public async publish(data?: any) {
		if (data) this.data = data;

		return this.client
			.publish(this.data, {
				key: this.key,
				lifetime:
					this.lifetime || this.expirationTimestamp
						? ((this.expirationTimestamp ?? 0) - Date.now()).toString()
						: undefined,
				password: this.password,
				secret: this.secret
			})
			.then((res) => this.refresh(res));
	}

	public async exists() {
		return this.client.exists(this.key).then(() => this);
	}

	protected refresh({ key, data, url, password, lifetime, expirationTimestamp, secret }: Partial<IDocument>) {
		if (key) this.key = key;
		if (data) this.data = data;
		if (url) this.url = url;
		if (password) this.password = password;
		if (lifetime || lifetime === 0) this.lifetime = lifetime;
		if (expirationTimestamp || expirationTimestamp === 0) this.expirationTimestamp = expirationTimestamp;
		if (secret) this.secret = secret;

		return this;
	}
}
