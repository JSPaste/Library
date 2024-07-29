import type { Request } from '../../Request.ts';
import type { AccessOptionsV2, AccessResponseV2 } from '../../types/endpoints/access.ts';

export const access = async (requestFetch: typeof Request.prototype.fetch, name: string, options?: AccessOptionsV2) => {
	const headers = new Headers();

	options?.password && headers.append('password', options.password);

	return requestFetch<AccessResponseV2>(`/documents/${name}`, {
		method: 'GET',
		headers: headers
	});
};
