import ErrorBoundary from "../lib/ErrorBoundary";
import ErrorFallback from "./Error/ErrorFallback";
import MakeError from "./Error/MakeError";

export default function () {
  return (
    <div>
      <ErrorBoundary
        fallback={ErrorFallback}
        onError={() => {
          console.log("出错啦");
        }}
      >
        <MakeError />
      </ErrorBoundary>
    </div>
  );
}
