import type { HTTP } from '../../HTTP.ts';
import type { RemoveResponse } from '../../types/endpoints/remove.ts';

export const remove = async (http: HTTP, name: string, secret: string) => {
	return http.fetch<RemoveResponse>(`/v2/documents/${name}`, {
		method: 'DELETE',
		headers: {
			secret: secret
		}
	});
};
