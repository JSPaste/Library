import type { IDocument } from './IDocument.ts';

interface IClientDocument extends IDocument {
	secret: string;
	edited?: boolean;
	removed?: boolean;
}

export type { IClientDocument };
