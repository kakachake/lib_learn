export function extend(a: any, b: any, context?: any) {
  Object.keys(b).forEach((key) => {
    if (typeof b[key] === "function") {
      a[key] = b[key].bind(context);
    } else {
      a[key] = b[key];
    }
  });
}
