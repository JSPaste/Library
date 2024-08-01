import type { HTTP } from '../../HTTP.ts';
import type { AccessOptionsV2, AccessResponseV2 } from '../../types/endpoints/access.ts';

export const access = async (requestFetch: typeof HTTP.prototype.fetch, name: string, options?: AccessOptionsV2) => {
	return requestFetch<AccessResponseV2>(`/documents/${name}`, {
		method: 'GET',
		headers: {
			...(options?.password && { password: options.password })
		}
	});
};
