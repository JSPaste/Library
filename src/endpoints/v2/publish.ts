import type { HTTP } from '../../HTTP.ts';
import type { PublishOptions, PublishResponse } from '../../types/endpoints/publish.ts';

export const publish = async (http: HTTP, data: string, options?: PublishOptions) => {
	return http.fetch<PublishResponse>('/v2/documents', {
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
