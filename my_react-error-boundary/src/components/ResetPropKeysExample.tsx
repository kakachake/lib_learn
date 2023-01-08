import { useState } from "react";
import ErrorBoundary, { withErrorBoundary } from "../lib/ErrorBoundary";
import ErrorFallback from "./Error/ErrorFallback";
import MakeError from "./Error/MakeError";

function ResetKeysExample(prop: { retry: number }) {
  return (
    <div>
      <MakeError />
    </div>
  );
}

export default withErrorBoundary(ResetKeysExample, {
  fallback: ErrorFallback,
  resetKeys: (props) => [props.retry],
});
