import type { HTTP } from '../../HTTP.ts';
import type { PublishOptionsV2, PublishResponseV2 } from '../../types/endpoints/publish.ts';

export const publish = async (requestFetch: typeof HTTP.prototype.fetch, data: string, options?: PublishOptionsV2) => {
	return requestFetch<PublishResponseV2>('/documents', {
		method: 'POST',
		body: data,
		headers: {
			...(options?.password && { password: options.password }),
			...(options?.keyLength && { keyLength: options.keyLength.toString() }),
			...(options?.key && { key: options.key }),
			...(options?.secret && { secret: options.secret })
		}
	});
};
