import type { HTTP } from '../../HTTP.ts';
import type { PublishOptionsV2, PublishResponseV2 } from '../../types/endpoints/publish.ts';

export const publish = async (http: HTTP, data: string, options?: PublishOptionsV2) => {
	return http.fetch<PublishResponseV2>('/v2/documents', {
		method: 'POST',
		body: data,
		headers: {
			...(options?.password && { password: options.password }),
			...(options?.keyLength && { keylength: options.keyLength.toString() }),
			...(options?.key && { key: options.key }),
			...(options?.secret && { secret: options.secret })
		}
	});
};
