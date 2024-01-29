import type { IDocument } from './Document';

export interface IClientDocument extends IDocument {
	secret: string;
	deleted: boolean;
}
