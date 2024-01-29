import type { IDocument } from './IDocument';

export interface IClientDocument extends IDocument {
	secret: string;
	edited?: boolean;
	removed?: boolean;
}
