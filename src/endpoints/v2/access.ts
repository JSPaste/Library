import type { Request } from '../../Request.ts';
import type { AccessOptionsV2, AccessResponseV2 } from '../../types/endpoints/access.ts';

export const access = async (requestFetch: typeof Request.prototype.fetch, key: string, options?: AccessOptionsV2) => {
	const passwordHeader = options?.password ? { password: options.password } : undefined;

	return requestFetch<AccessResponseV2>(`/documents/${key}`, {
		method: 'GET',
		headers: {
			...passwordHeader
		}
	});
};
