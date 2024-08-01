import type { HTTP } from '../../HTTP.ts';
import type { RemoveResponseV2 } from '../../types/endpoints/remove.ts';

export const remove = async (requestFetch: typeof HTTP.prototype.fetch, name: string, secret: string) => {
	return requestFetch<RemoveResponseV2>(`/documents/${name}`, {
		method: 'DELETE',
		headers: {
			secret: secret
		}
	});
};
