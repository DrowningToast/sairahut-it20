// src/lib/trpc.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server/router';
import type { FetchEsque } from '@trpc/client/dist/internals/types';

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [httpBatchLink({ url: '/api/trpc' })]
});

export const trpcOnServer = (fetch: FetchEsque) =>
	createTRPCProxyClient<AppRouter>({
		links: [
			httpBatchLink({
				url: '/api/trpc',
				fetch
			})
		]
	});
