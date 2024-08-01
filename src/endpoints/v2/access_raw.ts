import type { Request } from '../../Request.ts';
import type { AccessOptionsV2 } from '../../types/endpoints/access.ts';

export const access_raw = async (
	requestFetch: typeof Request.prototype.fetch,
	name: string,
	options?: AccessOptionsV2
) => {
	const headers = new Headers();

	options?.password && headers.append('password', options.password);

	return requestFetch<Buffer>(`/documents/${name}`, {
		method: 'GET',
		headers: headers
	});
};
