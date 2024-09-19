import type { HTTP } from '../../HTTP.ts';
import type { EditOptionsV2, EditResponseV2 } from '../../types/endpoints/edit.ts';

export const edit = async (http: HTTP, data: string, name: string, secret: string, options?: EditOptionsV2) => {
	return http.fetch<EditResponseV2>(`/v2/documents/${name}`, {
		method: 'PATCH',
		body: data,
		headers: {
			secret: secret,
			...(options?.password && { password: options.password })
		}
	});
};
