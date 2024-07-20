import type { Request } from '../../Request.ts';
import type { PublishOptionsV2, PublishResponseV2 } from '../../types/endpoints/publish.ts';

export const publish = async (requestFetch: typeof Request.prototype.fetch, data: any, options?: PublishOptionsV2) => {
	const keyHeader = options?.key ? { key: options.key } : undefined;
	const keyLengthHeader = options?.keyLength ? { keyLength: options.keyLength } : undefined;
	const secretHeader = options?.secret ? { secret: options.secret } : undefined;
	const passwordHeader = options?.password ? { password: options.password } : undefined;
	const lifetimeHeader = options?.lifetime ? { lifetime: options.lifetime } : undefined;

	return requestFetch<PublishResponseV2>('/documents', {
		method: 'POST',
		body: data,
		headers: {
			...keyHeader,
			...keyLengthHeader,
			...secretHeader,
			...passwordHeader,
			...lifetimeHeader
		}
	});
};
