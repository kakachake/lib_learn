import { useState } from "react";
import ErrorBoundary, { withErrorBoundary } from "../lib/ErrorBoundary";
import ErrorFallback from "./Error/ErrorFallback";
import MakeError from "./Error/MakeError";

function ResetKeysExample() {
  const [retry, setRetry] = useState(0);

  return (
    <div>
      <button onClick={() => setRetry(retry + 1)}>retry</button>

      <ErrorBoundary fallback={ErrorFallback} resetKeys={[retry]}>
        <MakeError />
      </ErrorBoundary>
    </div>
  );
}

export default withErrorBoundary(ResetKeysExample, {
  fallback: ErrorFallback,
});
