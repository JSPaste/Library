import type { HTTP } from '../../HTTP.ts';
import type { AccessOptions, AccessResponse } from '../../types/endpoints/access.ts';

export const access = async (http: HTTP, name: string, options?: AccessOptions) => {
	return http.fetch<AccessResponse>(`/v2/documents/${name}`, {
		method: 'GET',
		headers: {
			...(options?.password && { password: options.password })
		}
	});
};
