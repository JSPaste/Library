import { Client } from './classes/Client';
import { Document } from './classes/Document';
import { ClientDocument } from './classes/ClientDocument';
import type { JSPClientOptions } from './interfaces/request/JSPClientOptions';
import type { PublishOptions } from './interfaces/request/document/PublishOptions';
import type { EditOptions } from './interfaces/request/document/EditOptions';
import type { RemoveOptions } from './interfaces/request/document/RemoveOptions';

export class JSP {
	private readonly client: Client;

	public constructor(clientOptions: Partial<JSPClientOptions> = {}) {
		this.client = new Client(clientOptions);
	}

	public async access(key: string) {
		return this.client.access(key).then((doc) => new Document(this.client, doc));
	}

	public async publish(data: any, options?: PublishOptions) {
		return this.client
			.publish(data, options)
			.then((doc) => new ClientDocument(this.client, doc));
	}

	public async edit(data: any, options: EditOptions) {
		return this.client.edit(data, options).then((doc) => new ClientDocument(this.client, doc));
	}

	public async remove(key: string, options: RemoveOptions) {
		return this.client.remove(key, options).then(({ deleted }) => deleted);
	}
}
