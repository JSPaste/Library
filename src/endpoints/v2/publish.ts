import type { BodyInit } from 'undici-types/fetch.d.ts';
import type { Request } from '../../Request.ts';
import type { PublishOptionsV2, PublishResponseV2 } from '../../types/endpoints/publish.ts';

export const publish = async (
	requestFetch: typeof Request.prototype.fetch,
	data: BodyInit,
	options?: PublishOptionsV2
) => {
	const headers = new Headers();

	options?.password && headers.append('password', options.password);
	options?.keyLength && headers.append('keyLength', options.keyLength.toString());
	options?.key && headers.append('key', options.key);
	options?.secret && headers.append('secret', options.secret);

	return requestFetch<PublishResponseV2>('/documents', {
		method: 'POST',
		body: data,
		headers: headers
	});
};
