import type { HTTP } from '../../HTTP.ts';
import type { AccessOptionsV2, AccessResponseV2 } from '../../types/endpoints/access.ts';

export const access = async (http: HTTP, name: string, options?: AccessOptionsV2) => {
	return http.fetch<AccessResponseV2>(`/v2/documents/${name}`, {
		method: 'GET',
		headers: {
			...(options?.password && { password: options.password })
		}
	});
};
