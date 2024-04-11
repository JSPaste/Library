import type { JSPClientOptions } from '../types/Client.ts';
import type { EditOptions } from '../types/request/document/EditOptions.ts';
import type { PublishOptions } from '../types/request/document/PublishOptions.ts';
import type { RemoveOptions } from '../types/request/document/RemoveOptions.ts';
import { Client } from './Client.ts';

export class JSP {
	private readonly client: Client;

	public constructor(clientOptions: Partial<JSPClientOptions> = {}) {
		this.client = new Client(clientOptions);
	}

	public async access(key: string) {
		return this.client.access(key);
	}

	public async publish(data: any, options?: PublishOptions) {
		return this.client.publish(data, options);
	}

	public async exists(key: string) {
		return this.client.exists(key);
	}

	public async edit(data: any, options: EditOptions) {
		return this.client.edit(data, options);
	}

	public async remove(key: string, options: RemoveOptions) {
		return this.client.remove(key, options);
	}
}
