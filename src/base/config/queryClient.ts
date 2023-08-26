import { QueryClient } from '@tanstack/react-query';

function queryErrorHandler(error: unknown, query: unknown): void {
  console.log(error, query)
  const title = error instanceof Error ? error.message : 'error connecting to server';
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // onError: queryErrorHandler,
        staleTime: 600000, // 10 minutes
        cacheTime: 900000, // default cacheTime is 5 minutes; doesn't make sense for staleTime to exceed cacheTime
        // retry: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        useErrorBoundary: true,
        // suspense = true. it will has problem with option enabled.
        // https://tanstack.com/query/v4/docs/guides/suspense. It said:
        // NOTE: Suspense mode for React Query is experimental, same as Suspense for data fetching itself. These APIs WILL change and should not be used in production unless you lock both your React and React Query versions to patch-level versions that are compatible with each other
        suspense: false
      },
      mutations: {
        // onError: queryErrorHandler
        useErrorBoundary: true
      }
    }
  });
}

export const queryClient = generateQueryClient();
