import type { Request } from '../../Request.ts';
import type { EditOptionsV2, EditResponseV2 } from '../../types/endpoints/edit.ts';

export const edit = async (
	requestFetch: typeof Request.prototype.fetch,
	data: unknown,
	name: string,
	secret: string,
	options?: EditOptionsV2
) => {
	const headers = new Headers();

	headers.append('secret', secret);
	options?.password && headers.append('password', options.password);

	return requestFetch<EditResponseV2>(`/documents/${name}`, {
		method: 'PATCH',
		body: data,
		headers: headers
	});
};
