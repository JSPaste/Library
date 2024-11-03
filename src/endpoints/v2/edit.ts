import type { HTTP } from '../../HTTP.ts';
import type { EditOptions, EditResponse } from '../../types/endpoints/edit.ts';

export const edit = async (http: HTTP, data: string, name: string, secret: string, options?: EditOptions) => {
	return http.fetch<EditResponse>(`/v2/documents/${name}`, {
		method: 'PATCH',
		body: data,
		headers: {
			secret: secret,
			...(options?.password && { password: options.password })
		}
	});
};
