export interface HTTPOptions {
	headers: Record<string, string>;
	retries: number;
	timeout: number;
}
