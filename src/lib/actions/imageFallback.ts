/**
 * Svelte action that reports when an <img> has failed to load.
 *
 * Using only `on:error` is unreliable: a server-rendered image can finish (and
 * fail) loading before the component hydrates, so the error event fires before
 * the listener is attached and is lost. This action also checks the image's
 * state on mount (`complete` + zero `naturalWidth` === broken) to catch that case.
 *
 * Usage: <img use:imageFallback={() => (failed = true)} />
 */
export function imageFallback(node: HTMLImageElement, onFail: () => void) {
  let callback = onFail;

  const handleError = () => callback();

  // Catch failures that already happened before hydration.
  if (node.complete && node.naturalWidth === 0) {
    callback();
  }

  node.addEventListener("error", handleError);

  return {
    update(newOnFail: () => void) {
      callback = newOnFail;
    },
    destroy() {
      node.removeEventListener("error", handleError);
    },
  };
}
