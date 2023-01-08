import { FallbackProps } from "../../lib/ErrorBoundary";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div>
      <h1>出错啦</h1>
      <div>{error.message}</div>
      <button
        onClick={() => {
          resetErrorBoundary();
        }}
      >
        重置
      </button>
    </div>
  );
}
