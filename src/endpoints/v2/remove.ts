import type { Request } from '../../Request.ts';
import type { RemoveResponseV2 } from '../../types/endpoints/remove.ts';

export const remove = async (requestFetch: typeof Request.prototype.fetch, name: string, secret: string) => {
	const headers = new Headers();

	headers.append('secret', secret);

	return requestFetch<RemoveResponseV2>(`/documents/${name}`, {
		method: 'DELETE',
		headers: headers
	});
};
