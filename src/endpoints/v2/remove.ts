import type { HTTP } from '../../HTTP.ts';
import type { RemoveResponseV2 } from '../../types/endpoints/remove.ts';

export const remove = async (http: HTTP, name: string, secret: string) => {
	return http.fetch<RemoveResponseV2>(`/v2/documents/${name}`, {
		method: 'DELETE',
		headers: {
			secret: secret
		}
	});
};
