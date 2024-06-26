import { type ReactNode, Suspense } from "react";

import { ErrorFallback } from "@/components/elements/error-fallback";
import { SuspenseFallback } from "@/components/elements/suspense-fallback";
import { WatchUnhandledError } from "@/lib/react-error-boundary";
import { QueryClientProvider, queryClient } from "@/lib/tanstack-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <WatchUnhandledError />
      <Suspense fallback={<SuspenseFallback />}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
};
