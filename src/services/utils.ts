export function debounce(fn: Function, delay: number = 750) {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: any[]) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
