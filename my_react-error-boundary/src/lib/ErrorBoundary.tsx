import React, { ComponentType, isValidElement, PropsWithChildren } from "react";

export interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

type FallbackElement =
  | React.ReactElement<any, any>
  | ((props: FallbackProps) => React.ReactElement<any, any>)
  | null;

export interface ErrorBoundaryProps {
  fallback: FallbackElement;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
  resetKeys?: any[] | ((props: any) => any[]);
  onResetKeysChange?: (prevResetKeys: any[], resetKeys: any[]) => void;
  areResetKeysEqual?: (prevResetKeys: any[], resetKeys: any[]) => boolean;
}

const changedArray = (a: any[], b: any[]) => {
  if (a === b) return false;

  return (
    a.length !== b.length ||
    a.some((item, index) => {
      return !Object.is(item, b[index]);
    })
  );
};

export interface ErrorBoundaryState {
  error?: Error;
  resetKeys?: any[];
}

const initialState: ErrorBoundaryState = {
  error: undefined,
  resetKeys: undefined,
};

class ErrorBoundary extends React.Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state = initialState;

  constructor(props: any) {
    super(props);
  }
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can also log the error to an error reporting service
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(
    prevProps: Readonly<React.PropsWithChildren<ErrorBoundaryProps>>,
    prevState: Readonly<ErrorBoundaryState>,
    snapshot?: any
  ): void {
    const childProps = (this.props.children as any).props;
    let { resetKeys: prevResetKeys } = prevProps;
    let { resetKeys } = this.props;
    if (!resetKeys && !prevResetKeys) return;
    const { error } = this.state;

    if (typeof resetKeys === "function") {
      prevResetKeys = this.state.resetKeys;
      resetKeys = resetKeys(childProps);
    }

    if (prevResetKeys === undefined) {
      this.setState({ resetKeys });
      return;
    }

    const equal = this.props.areResetKeysEqual ?? changedArray;
    if (error && equal(prevResetKeys as any[], resetKeys as any[])) {
      this.setState({ resetKeys });
      this.reset();
    }
  }

  reset = () => {
    this.setState(initialState);
  };

  resetErrorBoundary = () => {
    this.reset();
    this.props.onReset?.();
  };

  render() {
    const fallbackProps: FallbackProps = {
      error: this.state.error!,
      resetErrorBoundary: this.resetErrorBoundary,
    };
    const { fallback } = this.props;
    const { error } = this.state;
    if (error) {
      if (isValidElement(fallback)) return fallback;
      else if (typeof fallback === "function") {
        return fallback(fallbackProps);
      }

      throw new Error("ErrorBoundary 组件需要传入 fallback");
    }
    return this.props.children;
  }
}

export function withErrorBoundary<P>(
  Component: ComponentType<P>,
  errorBoundaryProps: ErrorBoundaryProps
) {
  const Wrapper: React.ComponentType<PropsWithChildren<P>> = (
    props: PropsWithChildren<P>
  ) => {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  const name = Component.displayName || Component.name || "Unknown";
  Wrapper.displayName = `withErrorBoundary_${name}`;

  return Wrapper;
}

export default ErrorBoundary;
