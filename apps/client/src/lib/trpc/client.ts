import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import type { Routers } from './procedure';

let browserClient: ReturnType<typeof createTRPCClient<Routers>>;

export function trpc(init?: TRPCClientInit) {
	const isBrowser = typeof window !== 'undefined';
	if (isBrowser && browserClient) return browserClient;
	const client = createTRPCClient<Routers>({ init });
	if (isBrowser) browserClient = client;
	return client;
}
